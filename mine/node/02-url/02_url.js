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
 if (req.url == '/home') {
   res.writeHead(200, {
     "Content-type": "text/html;charset=UTF-8"
   })
   res.end("hello world" + req.url)
 } else {
   res.writeHead(404, {
     "Content-type": "text/html;charset=UTF-8"
   });
   res.end("页面不存在");
 }
});

server.listen(3000, "127.0.0.1");
