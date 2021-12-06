require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const expressWs = require("express-ws")(app);
const port = process.env.PORT || 33290;

const { Client } = require("pg");

log("DB URL is " + process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production",
});

client.connect();

client.query("SELECT * FROM actions_in_rooms;", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) log(JSON.stringify(row));
  client.end();
});

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
  .listen(port, () => log(`Listening on ${port}`));

function log(message) {
  console.log(`[COOL-DARTS] ${message}`);
}
