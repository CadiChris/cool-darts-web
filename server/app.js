const express = require("express");
const path = require("path");
const { Adapters } = require("./adapters");
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
  .post("/room/clean", (res) => {
    new ActionsInRoomsRepository(Adapters.DbAdapter).cleanRoom();
    res.status(200);
  });

module.exports = { app };
