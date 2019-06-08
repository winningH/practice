// 创建一个空的buffer, 速度快
var buf = Buffer.allocUnsafe(9)
console.log(buf)

// 创建一个buffer，并填充
 var buf = Buffer.alloc(10,1)
 console.log(buf)

 // 根据字符串创建buf
 var buf = Buffer.from('我喜欢node')
 console.log(buf)
 console.log(buf.toString('utf-8'))

 // 写入buf
 buf.write(1,)

 // 填满一个buf
 buf.fill()

 