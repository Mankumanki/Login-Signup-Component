import pg from "pg";
import env from "dotenv";

env.config({
  path: "../.env",
});

const database = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
};

function dbClient() {
  return new pg.Client(database);
}

export default dbClient;
