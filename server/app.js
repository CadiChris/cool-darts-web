const express = require("express");
const path = require("path");
const cors = require("cors");
const {
  ActionsInRoomsRepository,
} = require("./Cricket/ActionsInRoomsRepository");
const { Lobby, Joueur } = require("./Cricket/Lobby");

function makeApp({ dbAdapter, allowCors = false, setupErrorReporting }) {
  const app = express();

  if (setupErrorReporting) setupErrorReporting.before(app);
  if (allowCors) app.use(cors());

  require("express-ws")(app);

  const actionsInRoomsRepository = new ActionsInRoomsRepository(dbAdapter);
  const lobby = new Lobby({ actionsInRoomsRepository });

  app
    .use(express.static(path.join(__dirname, "./../client/dist")))
    .ws("/api/web-socket", (socket) => {
      const joueur = new Joueur({ socket });
      lobby.joinRoom(joueur, "Salle A");
      socket.on("message", (msg) => lobby.jouer(joueur, msg));
    })
    .get("/room/actions", (req, res) => {
      actionsInRoomsRepository
        .getAllReduxActions()
        .then((actions) => res.status(200).json(actions));
    })
    .post("/room/clean", (req, res) => {
      actionsInRoomsRepository.cleanRoom().then(() => res.status(200).json());
    });

  if (setupErrorReporting) setupErrorReporting.after(app);

  return app;
}

module.exports = { makeApp };
