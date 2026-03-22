const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const fs = require("fs");
const queryString = require("querystring");
const url = require("url");

const server = http.createServer((req, res) => {
  const query = url.parse(req.url).query;
  const n = Number(queryString.parse(query)["n"]);
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += i;
  }

  res.end(String(sum));
});

server.listen(3000, () => {
  console.info(`server listening to 3000`);
});
