require("dotenv").config();
const { app } = require("./app");
const { log } = require("./log");
const { Adapters } = require("./adapters");
const { DbAdapterPostgre } = require("./DbAdapter.postgre");

Adapters.DbAdapter = DbAdapterPostgre;

const port = process.env.PORT || 33290;

app.listen(port, () => log(`Listening on ${port}`));
