const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  if (req.url == "/rect") {
    fs.readFile("rect.html", "UTF-8", (err, data) => {
      res.end(data);
    })
  } else if (req.url == "/rect.css") {
    fs.readFile("rect.css", "UTF-8", (err, data) => {
      res.end(data);
    })
  } else if (req.url == "/round") {
    fs.readFile("round.html", "UTF-8", (err, data) => {
      res.end(data);
    })
  }
}).listen(3001, "127.0.0.1")