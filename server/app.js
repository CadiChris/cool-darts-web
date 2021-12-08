const express = require("express");
const path = require("path");
const { ActionsInRoomsRepository } = require("./ActionsInRoomsRepository");
const { Lobby, Joueur } = require("./Lobby");

function makeApp({ dbAdapter }) {
  const actionsInRoomsRepository = new ActionsInRoomsRepository(dbAdapter);
  const lobby = new Lobby({ actionsInRoomsRepository });

  const app = express();
  require("express-ws")(app);
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

  return app;
}

module.exports = { makeApp };
