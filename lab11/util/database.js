// util/database.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "password_validator",
  password: "9324b11ddB.",
});

module.exports = pool.promise();
