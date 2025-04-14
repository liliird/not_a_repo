const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "plantas",
  password: "9324b11ddB.",
});

module.exports = pool.promise();
