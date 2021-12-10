const { Client } = require("pg");
const { log } = require("../log");
const format = require("pg-format");
const { Env } = require("../env/Env");

log("DB URL is " + process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: Env.estEnProd() ? { rejectUnauthorized: false } : false,
});

client.connect();

const DbAdapterPostgre = {
  async truncate(table) {
    await client.query(format("TRUNCATE TABLE %I;", table));
    log(`Truncated table ${table}`);
  },

  async getAll(table, orderBy) {
    const texte = format(`SELECT * FROM %I ORDER BY %s;`, table, orderBy);
    const res = await client.query(texte);
    return res.rows;
  },

  async insert(table, columns, values) {
    const c = columns.join(",");
    const v = values.map((_, i) => "$" + Number(i + 1)).join(",");
    await client.query(`INSERT INTO ${table}(${c}) VALUES (${v});`, values);
  },

  async copy({ source, destination }) {
    await client.query(
      format(`INSERT INTO %I SELECT * FROM %I;`, destination, source)
    );
  },

  async transaction(statements) {
    try {
      await client.query("BEGIN;");
      await statements();
      await client.query("COMMIT;");
    } catch (e) {
      await client.query("ROLLBACK;");
    }
  },
};

module.exports = { DbAdapterPostgre };
