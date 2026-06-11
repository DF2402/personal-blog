import "server-only";
import knex from "knex";

async function createDatebase() {
  const db = knex({
    client: "pg",
    connection: {
      host: "localhost",
      user: "admin",
      password: "admin",
      database: "postgres",
    },
  });

  try {
    await db.raw("CREATE DATABASE db");
  } catch (error) {
    console.error(error);
  } finally {
    await db.destroy();
  }
}

createDatebase();
