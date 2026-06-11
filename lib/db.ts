import "server-only";
import knex from "knex";
import config from "../knexfile";

let dbInstance: any = null;
export const getDb = () => {
  if (!dbInstance) {
    dbInstance = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
    });
  }
  return dbInstance;
};
