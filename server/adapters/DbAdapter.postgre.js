const { Client } = require("pg");
const { log } = require("../log");
const format = require("pg-format");

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
    await client.query(format("TRUNCATE TABLE %I;", table));
    log(`Truncated table ${table}`);
  },

  async getAll(table) {
    const res = await client.query(format("SELECT * FROM %I;", table));
    return res.rows;
  },

  async insert(table, columns, values) {
    const c = columns.join(",");
    const v = values.map((_, i) => "$" + Number(i + 1)).join(",");
    await client.query(`INSERT INTO ${table}(${c}) VALUES (${v});`, values);
  },
};

module.exports = { DbAdapterPostgre };
