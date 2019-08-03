var http = require('http');
var fs = require("fs");     // 文件模块(file system)

var server = http.createServer(function (req, res) {
  if (req.url == '/home') {
    /*
      读取文件函数: 文件路径及名称，回调函数
    */
    fs.readFile("fs.html", "UTF-8", function (err, data) {
      if (err) throw err;
      res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
      res.end(data);
      console.log(data);
    })
  } else if (req.url == "/fs.css") {
    fs.readFile("fs.css", "UTF-8", function (err, data) {
      res.writeHead(200, {"Content-type": "text/css;charset=UTF-8"});
      res.end(data);
    })
  } else {
    res.writeHead(404, {"Content-type": "text/html;charset=UTF-8"});
    res.end("页面不存在");
  }
});

server.listen(3000, "127.0.0.1");
