main(List<String> args) {
  // 向Event队列中添加一个任务
  // Future(() => 21)
  // .then((v)=> v*2)
  // .then((v) => print(v));

  // 在指定的时间后，添加一个event
  // Future.delayed(const Duration(seconds: 1), (){
  //   // 具体任务代码
  // });

  // scheduleMicrotask((){
  //   // 添加一个 微任务队列任务
  // });

  Future(()=>futureTask())
    .then((i) => 'abc $i')
    .then(print)
    .then((_)=> Future.error('出错了'))
    .whenComplete(() => print('完成'))
    .catchError(print, test: (Object o) {
      print(o);
      return true;
    });
}

futureTask() => 10;

/// 关于Future需要注意的几点
/// 1.被添加到then里边的方法，会在futre执行后，立马执行(这个方法，没有被加入到任何队列，只是被回调了)
/// 2.如果在then调用之前，Future就已经执行完毕，那么就会有一个任务 
/// 会被加入 到microtask队列中，这个任务 就是 被传入then的方法
/// 3.Future 和 Future.delayed 构造方法 并不会立刻完成，会向event队列中，添加一个任务
/// 4.Future.value() 会在 microtask中完成
/// 5.Future sync() 构造方法，会立马执行，并在microtask中完成

