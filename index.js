const express = require("express");
const path = require("path");
const app = express();
const expressWs = require("express-ws")(app);
const port = process.env.PORT || 3000;

app
  .use(express.static(path.join(__dirname, "./client/dist")))
  .ws("/api/web-socket", (ws) => {
    log("Client connected ");
    ws.on("message", (msg) => log(`Socket received ${msg}`));
  })
  .listen(port, () => console.log(`Listening on ${port}`));

function log(message) {
  console.log(`[COOL-DARTS] ${message}`);
}
