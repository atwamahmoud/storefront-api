import {Pool} from "pg";
import dotenv from "dotenv";
import {ENV_FILE} from "../utils/constants";
dotenv.config({
  path: ENV_FILE,
});
const db_client = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || ""),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default db_client;
