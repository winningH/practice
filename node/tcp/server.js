var net = require("net");
var server = net.createServer((connection)  => {
  console.log('clinet connected');
  connection.on("data", data => {
    console.log("server接收：" + data.toString());
  });

  connection.on("end", function() {
    console.log("clinet close")
  })
  connection.end("hello I am \r\n");
})

server.listen(3000, function() {
  console.log('server is listening at 3000')
})