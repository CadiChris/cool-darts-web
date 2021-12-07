const express = require("express");
const path = require("path");
const { Adapters } = require("./adapters/adapters");
const { log } = require("./log");
const { ActionsInRoomsRepository } = require("./ActionsInRoomsRepository");

const app = express();
const expressWs = require("express-ws")(app);

app
  .use(express.static(path.join(__dirname, "./../client/dist")))
  .ws("/api/web-socket", (newSocket) => {
    log("Client connected. Total clients: " + expressWs.getWss().clients.size);

    newSocket.on("message", (msg) => {
      log(`Socket received ${msg}`);
      [...expressWs.getWss().clients]
        .filter((ws) => ws !== newSocket)
        .forEach((ws) => ws.send(msg));
    });
  })
  .get("/room/actions", (req, res) => {
    const repository = new ActionsInRoomsRepository(Adapters.DbAdapter);
    repository
      .getAllReduxActions()
      .then((actions) => res.status(200).json(actions));
  })
  .post("/room/clean", (req, res) => {
    const repository = new ActionsInRoomsRepository(Adapters.DbAdapter);
    repository.cleanRoom().then(() => res.status(200).json());
  });

module.exports = { app };
