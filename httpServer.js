"use strict";

const http = require("http");
const port = process.env.PORT || 8000;
const fs = require("fs");
const path = require("path");
const petsPath = path.join(__dirname, "pets.json");
const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(petsPath, "utf8", (error, data) => {
      if (error) {
        console.error(error.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    });
  } else if (req.method === "GET" && petRegExp.test(req.url)) {
    let found = req.url.match(petRegExp);
    console.log("found");
    console.log(found);
    fs.readFile(petsPath, "utf8", (error, data) => {
      if (error) {
        console.error(error.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }
      let pets = JSON.parse(data);
      let petsJSON = JSON.stringify(pets[parseInt(found[1])]);

      if (petsJSON === undefined) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        //res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
      } else {
        res.setHeader("Content-Type", "application/json");
        console.log("res header");
        console.log(res.getHeader("Content-Length"));
        res.end(petsJSON);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(port, function () {
  console.log("Listening on port: ", port);
});
