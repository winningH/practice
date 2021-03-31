// 当遇到 需要延迟的运算 async， 它会将延迟运算 放到一个 队列中去。

main(List<String> args) {
  // 在main函数中，不需要 延迟 的先执行掉，最后再来处理延迟运算的部分

  /// Future 将来
  /// 表示 在将来某个时候会获取到的一个值
  /// 当一个返回Future的函数被调用的时候
  /// 1.函数把自己放到队列中 （用于事件循环）
  /// 2.返回一个未完成的Future对象
  ///
  /// 要获取Future中的值，也有两种方法
  /// 1. async 和 await
  /// 2. 使用Future的接口

  getName();
  getName2();
  getName3();
  getName4();
}

getName() async {
  // 假设这个地方 比较耗时
  // 它可能会造成 main函数阻塞
  // 声明成 async
  await getStr();
  // await getName3();
  await getStr2();
  // getStr();
  // getName3();
  // getStr2();
  print('name');
}
// 异步的函数 调用的时候 都需要使用 await
// awiat 只能 在 带有async 声明的函数中使用

getStr() {
  print('getStr');
}

getStr2() async {
  await print('getStr2');
  print('str2');
}

getName2() {
  print('name2');
}

getName3() {
  print('name3');
}

getName4() {
  print('name4');
}
