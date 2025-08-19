import pkg from "pg"
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pkg;

import pg, { types } from "pg";

// 1082 = DATE, 1114 = TIMESTAMP WITHOUT TZ, 1184 = TIMESTAMP WITH TZ
pg.types.setTypeParser(1082, (str) => str); // OID 1082 = DATE
pg.types.setTypeParser(1114, (str) => str); // OID 1114 = TIMESTAMP
types.setTypeParser(1184, (val) => val); // timestamptz → string

// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_DATABASE);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_PORT);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.on("connect", () => {
    console.log("Connection pool established with DB");
})
export default pool