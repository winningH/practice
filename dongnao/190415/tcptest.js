var net = require('net')
var client = net.Socket();
// 链接tcp服务器
client.connect(3300, '127.0.0.1', function(){
	setTimeout(function(){
		client.write('kill a boss')
	})
})
// 接收到客户端信息
client.on('data', function(data){
	console.log(data.toString())
	console.log('playing')
})