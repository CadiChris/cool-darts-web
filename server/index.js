require("dotenv").config();
const { makeApp } = require("./app");
const { log } = require("./log");
const { DbAdapterPostgre } = require("./adapters/DbAdapter.postgre");

const port = process.env.PORT || 33290;

const app = makeApp({ dbAdapter: DbAdapterPostgre });

app.listen(port, () => log(`Listening on ${port}`));
