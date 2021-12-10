require("dotenv").config();
const Sentry = require("@sentry/node");
const { makeApp } = require("./app");
const { log } = require("./log");
const { DbAdapterPostgre } = require("./adapters/DbAdapter.postgre");
const { Env } = require("./env/Env");

const port = process.env.PORT || 33290;

const app = makeApp({
  dbAdapter: DbAdapterPostgre,
  allowCors: !Env.estEnProd(),

  // https://docs.sentry.io/platforms/node/guides/express/
  setupErrorReporting: {
    before: (app) => {
      Sentry.init({
        dsn: "https://de19bc121e2949579a171012cc4894e8@o379759.ingest.sentry.io/6103052",
      });
      app.use(Sentry.Handlers.requestHandler());
    },
    after: (app) => app.use(Sentry.Handlers.errorHandler()),
  },
});

app.listen(port, () => log(`Listening on ${port}`));
