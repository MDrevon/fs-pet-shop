//import { Client } from "pg";
const { get } = require("httpie");
const { Client } = require("pg");
const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "petshop",
  password: "docker",
  port: 5432,
});

const getPets = (req, res) => {
  db.connect();
  db.query(`SELECT * FROM pets`, (err, results) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    }
    console.log(results.rows);
    //res.json(results.rows);
  });
  db.close();
};

module.exports = getPets;
