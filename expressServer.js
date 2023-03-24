"use strict";

const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
const path = require("path");
const petsPath = path.join(__dirname, "pets.json");

app.get("/", (req, res) => {
  console.log(petsPath);
});

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
  //   console.log(req.params.id);
  //   res.end(req.params.id);
  let id = parseInt(req.params.id);
  fs.readFile(petsPath, "utf8", (error, data) => {
    if (error) {
      console.error(error.stack);
      res.status = 500;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Internal Server Error");
    }
    let pets = JSON.parse(data);
    //console.log(pets);

    console.log(typeof id);
    console.log(id);
    //console.log(parseInt(id));
    if (req.params.id < 0 || req.params.id >= pets.length) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Invalid Index");
    } else if (isNaN(id)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Invalid Index");
    }
    let petsJSON = JSON.stringify(pets[req.params.id]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(petsJSON);
  });
});

app.listen(port);
