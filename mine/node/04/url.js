const http = require('http');
const urlLib = require('url');

http.createServer(function (req, res) {
  var obj = urlLib.parse(req.url, true);
  console.log(obj);
  res.end('finish');
}).listen(3000)