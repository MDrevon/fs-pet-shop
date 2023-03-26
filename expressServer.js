"use strict";

const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
const path = require("path");
const petsPath = path.join(__dirname, "pets.json");

app.get("/pets", (req, res) => {
  fs.readFile(petsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error.stack);
      res.status = 500;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Internal Server Error");
    }
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

app.get("/pets/:id", (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile(petsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error.stack);
      res.status = 500;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Internal Server Error");
    }
    let pets = JSON.parse(data);

    if (req.params.id < 0 || req.params.id >= pets.length || isNaN(id)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }
    let petsJSON = JSON.stringify(pets[req.params.id]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(petsJSON);
  });
});

app.post("/pets/age=:age/kind=:kind/name=:name", (req, res) => {
  //console.log(req);
  let age = parseInt(req.params.age);
  let kind = req.params.kind;
  let name = req.params.name;

  fs.readFile(petsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error.stack);
      res.status = 500;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Internal Server Error");
    }
    let pets = JSON.parse(data);
    if (age <= 0 || isNaN(age) || kind === "" || name === "") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    } else {
      pets.push({ age: age, kind: kind, name: name });
      let petsJSON = JSON.stringify(pets);
      fs.writeFile("pets.json", petsJSON, "utf8", (error) => {
        if (error) {
          console.log(error);
        } else {
          return res.end("posted");
        }
      });
    }
  });
});

app.get("/*", (req, res, next) => {
  next({ status: 404, message: "Not Found" });
});

app.get("/boom", (req, res, next) => {
  next({ status: 500, message: "Internal Server Error" });
});

app.use((err, req, res, next) => {
  console.log("ts");
  res.status(err.status).json({ error: err });
});

app.listen(port);
