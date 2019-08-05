const http = require('http');
const urlLib = require('url');

http.createServer(function (req, res) {
  // true 将obj.query 转成 objecct
  var obj = urlLib.parse(req.url, true);
  console.log(obj);
  res.end('finish');
}).listen(3000)