const express = require("express");
const path = require("path");
const app = express();
const expressWs = require("express-ws")(app);
const port = process.env.PORT || 33290;

app
  .use(express.static(path.join(__dirname, "./client/dist")))
  .ws("/api/web-socket", (ws) => {
    log("Client connected. Total clients: " + expressWs.getWss().clients.size);

    ws.on("message", (msg) => {
      log(`Socket received ${msg}`);
      [...expressWs.getWss().clients]
        .filter((aWs) => aWs !== ws)
        .forEach((aWs) => aWs.send(msg));
    });
  })
  .listen(port, () => console.log(`Listening on ${port}`));

function log(message) {
  console.log(`[COOL-DARTS] ${message}`);
}
