require("dotenv").config();
const { app } = require("./app");
const { log } = require("./log");

log("DB URL is " + process.env.DATABASE_URL);

const port = process.env.PORT || 33290;

app.listen(port, () => log(`Listening on ${port}`));
