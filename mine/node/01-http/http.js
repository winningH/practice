/*
  服务模块:
  打开服务:

  流程：
    1、引入模块，通过变量来接收
    2、通过http.createServer创建服务
    3、监听端口号和访问地址
    4、通用res.writeHead 设置网页状态码和文档内容类型
    5、通过res.end 返回
 */

var http = require("http");

var server = http.createServer(function (req, res) {
  /*、
    设置响应http头部信息
    第一个参数：传入网页状态码，200表示请求正常
    第二个参数：设置文档内容类型：text/html 表示html文档，chartset=UFT-8表示文档编码类型
  */
  res.writeHead(200, {
    "Content-type": "text/html;charset=UTF-8"
  });
  console.log('服务器接收到了请求' + req.url);
  res.end("Hello World"); // 如果没有res.end 会存在挂起状态，
});

server.listen(3000, "127.0.0.1");

/*
   服务器默认端口号：80端口号
   Tomcat默认端口：8080
 */