const express = require("express");
const path = require("path");
const { Adapters } = require("./adapters/adapters");
const { log } = require("./log");
const { ActionsInRoomsRepository } = require("./ActionsInRoomsRepository");
const { Lobby, Joueur } = require("./Lobby");

const app = express();
const expressWs = require("express-ws")(app);

const lobby = new Lobby();

app
  .use(express.static(path.join(__dirname, "./../client/dist")))
  .ws("/api/web-socket", (newSocket) => {
    const joueur = new Joueur({ socket: newSocket });
    lobby.joinRoom(joueur, "Salle A");
    newSocket.on("message", (msg) => lobby.jouer(joueur, msg));
  })
  .get("/room/actions", (req, res) => {
    new ActionsInRoomsRepository(Adapters.DbAdapter)
      .getAllReduxActions()
      .then((actions) => res.status(200).json(actions));
  })
  .post("/room/clean", (req, res) => {
    new ActionsInRoomsRepository(Adapters.DbAdapter)
      .cleanRoom()
      .then(() => res.status(200).json());
  });

module.exports = { app };
