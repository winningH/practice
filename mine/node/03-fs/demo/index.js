const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  /* if (req.url == "/www/rect") {
    fs.readFile("www/rect.html", "UTF-8", (err, data) => {
      res.end(data);
    })
  } else if (req.url == "/www/rect.css") {
    fs.readFile("www/rect.css", "UTF-8", (err, data) => {
      res.end(data);
    })
  } else if (req.url == "/www/round") {
    fs.readFile("www/round.html", "UTF-8", (err, data) => {
      res.end(data);
    })
  } else {
    res.write('404 Not Found');
    res.end();
  } */
  // console.log(req.url)
  var file_name = './www' + req.url
  fs.readFile(file_name, "UTF-8", (err, data) => {
    if (err) {
      res.end('404');
    } else {
      res.end(data);
    }
  })
}).listen(3001, "127.0.0.1")
