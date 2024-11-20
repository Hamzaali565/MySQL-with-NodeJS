import mysql from "mysql";
import util from "util";
import * as dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("DB ERROR", err);
    process.exit(1);
  }
  console.log("Connected to database");
});

export const query = util.promisify(connection.query).bind(connection);
