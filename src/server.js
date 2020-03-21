require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";

import fs from "fs";
import path from "path";

// port
const PORT = 8080;

// express
const app = express();
const server = require("http").createServer(app);

// body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.text()); // support encoded bodies

// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// public at root
app.use(express.static(__dirname + "/public"));
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

app.post("/test-drive-pie", async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.Email,
      from: "hello@refreshlabs.com",
      templateId: "d-d306abf9a0e341f4a0df201e144601cc"
    };
    sgMail.send(msg);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
