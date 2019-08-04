main(List<String> args) {
  int add(int x, int y) {
    return x + y;
  }

  print(add(1, 2));

  // 所有的函数都有返回值， 如果没有指定，那么 默认会返回null
  // 在所有函数体 内部， 如果没有return， 会在 函数的最后，默认 return null

  testFunc () {}
  print(testFunc());

  // 可省略 函数参数的类型 (不建议)
  add1(x, y) {
    return x + y;
  }
  print(add1(2, 3));
  print(add1('2', '3'));

  Function add3 (int x, int y) {
    return () => 1;
  }
  print(add3(1, 1));

  /// 可选命名参数
  /// 使用 {param1, param2...} 形式来指定 命名参数
  // int add4(int x, int y) => x + y;
  int add4({int x, int y}) {
    // x = x || 1; 
    x ??= 1;  // 如果值为空，就给它赋值， 如果不为空 ，那么就跳过
    y ??= 2;
    return x + y;
  };
  print('可选命名参数：${add4(x: 3, y:5)}');

  // 可选位置参数：把 可选值参数 放到[] 中，必填参数，必须要放到可选参数 前面
  int add5(int x, [int y, int z]) {
    y ??=2;
    z ??= 3;
    return x + y + z;
  }
  print(add5(1, 10));

  /// 默认值
  /// 可选命名参数默认值
  int add6(int x, {int y = 5, int z: 7}) => x + y + z;
  // dart 2.0 之前 可以用 ：
  // dart 2.0 之后 用 = 
  print(add6(1, z: 5));

  int add7(int x, [int y = 5, int z = 7]) => x + y + z;
  // dart 2.0 之前 可以用 ：
  // dart 2.0 之后 用 = 
  print(add7(1, 9));

  // 使用 list 或者 map 作为默认值的时候， 必须是const 类型
  int add8(int x, {List<int> y = const [20, 30]}) {
    int sum = x;
    for (int v in y) {
      sum += v;
    }
    return sum;
  }
  print(add8(10));


  /// 匿名函数
   var anonFunc1 = () => print('无参数匿名参数');
   anonFunc1();
   (() => print('匿名函数的自调用'))(); // 匿名函数的自调用

  //  匿名函数传参
  List test(List list, String func(str)) {
    for (var i = 0; i < list.length; i++) {
      list[i] = func(list[i]);
    }
    return list;
  }

  var list = ['h', 'e', 'l', 'l', 'o'];
  print(test(list, (str) => str * 2));

  list.forEach((item) => print("item: $item"));

  // 函数的闭包 事实上 就是返回一个函数，返回的函数中， 可以访问 原函数中的 变量
  Function makeAddFunc (int x) {
    return (int y) => x++ + y;
  }
  var addFunc = makeAddFunc(1);
  print(addFunc(2));
  print(addFunc(3));


  /// 函数的别名
  // substruact(int a, int b) {
  //   print('substract：${a - b}');
  // }
  // MyFunc myFunc;
  // myFunc = substruact;

  // typedef MyFunc(int a, int b);
  
}