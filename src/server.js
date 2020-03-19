require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";

import fs from 'fs';
import path from 'path';

// port
const PORT = 8080;

// express
const app = express();
const server = require("http").createServer(app);

// body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.text()); // support encoded bodies

// public at root
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
  fs.readFile(path.resolve("public", "index.html"), "utf8", (err, data) => {
    if (err) {
      res.status(404);
      res.setHeader("content-type", "text/plain");
      res.send(`File not found (${err})`);
    } else {
      res.setHeader("content-type", "text/html");
      res.send(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
