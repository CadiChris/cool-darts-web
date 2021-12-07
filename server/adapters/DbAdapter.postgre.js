const { Client } = require("pg");
const { log } = require("../log");

log("DB URL is " + process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

client.connect();

const DbAdapterPostgre = {
  async truncate(table) {
    await client.query(`TRUNCATE TABLE ${table};`);
  },
};

module.exports = { DbAdapterPostgre };
