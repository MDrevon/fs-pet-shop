"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Client } = require("pg");
const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "petshop",
  password: "docker",
  port: 5432,
});
const port = process.env.PORT || 3000;

db.connect();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Test");
});

app.get("/pets", (req, res) => {
  db.query(`SELECT * FROM pets`).then((results) => {
    res.send(results.rows);
  });
});

app.get("/pets/:id", (req, res) => {
  db.query(`SELECT * FROM pets WHERE id = $1`, [req.params.id]).then(
    (results) => {
      if (results.rows.length == 0) {
        res.status(404).send("Pet Id not found");
      } else {
        res.send(results.rows);
      }
    }
  );
});

app.post("/pets", (req, res) => {
  db.query(`INSERT INTO pets (petName, age, kind) VALUES ($1, $2, $3)`, [
    req.body.petname,
    req.body.age,
    req.body.age,
  ]).then((result) => {
    res.send(`Inserted Pet`);
  });
});

app.put("/pets/:id", (req, res) => {
  db.query(
    `UPDATE pets SET petname=$1, age=$2, kind=$3 WHERE id=${req.params.id}`,
    [req.body.petname, req.body.age, req.body.kind]
  ).then((results) => {
    res.send(`Updated Pet at id: ${req.params.id}`);
  });
});

app.patch("/pets/:id", (req, res) => {
  const key = Object.keys(data)[0];
  const value = Object.values(data)[0];
  db.query(`UPDATE pets SET $1 = $2 WHERE id = $3`, [
    key,
    value,
    req.params.id,
  ]).then((results) => {
    res.send(`Updated Pet at id: ${req.params.id}`);
  });
});

app.delete("/pets/:id", (req, res) => {
  db.query(`DELETE FROM pets WHERE id = $1`, [req.params.id]).then(
    (results) => {
      res.send(`Deleted Pet at id: ${req.params.id}`);
    }
  );
});

app.get("/boom", (req, res, next) => {
  next({ status: 500, message: "Internal Server Error" });
});

app.get("/*", (req, res, next) => {
  next({ status: 404, message: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
