require("dotenv").config();
const { makeApp } = require("./app");
const { log } = require("./log");
const { DbAdapterPostgre } = require("./adapters/DbAdapter.postgre");
const { Env } = require("./env/Env");

const port = process.env.PORT || 33290;

const app = makeApp({
  dbAdapter: DbAdapterPostgre,
  allowCors: !Env.estEnProd(),
});

app.listen(port, () => log(`Listening on ${port}`));
