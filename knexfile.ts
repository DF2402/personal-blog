import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 2, max: 10 },
  migrations: {
    extension: "ts",
    tableName: "knex_migrations",
  },
};

export default config;
