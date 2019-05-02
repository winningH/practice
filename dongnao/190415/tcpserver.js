const net = require('net')

// 创建一个tcp服务器
var server = net.createServer(function(Socket) {
	console.log('someone connect')
})

// 设置一个监听端口
server.listen(3300)
// 检测连接事件
server.on('connection', function(Socket){
	// 发送数据给客户端
	Socket.write('login success')
	// 监听客户端发送过来的数据
	Socket.on('data', function(data){
		Socket.write('')
	})
})
server.on('close', function(){
	console.log('server closed')
})
server.on('error', function(){
	console.log('server error')
})