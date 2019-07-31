main(List<String> args) {
  var a;
  // 变量，没有初始值，那么它可以是任何类型
  a = 'huang';
  a = 123;
  a = true;
  a = { 'key': 'value' };
  a = ['123', 'abc'];
  print(a);

  Object b = 'stirng';
  b = 123;
  b = { 'key': 'value'};
  print(b);

  dynamic c = 'string';
  c = 123;

  // var d = 123;
  // d = 'stirng';  //不允许

  // 使用var声明的时候，如果没有初始值，后边可以为任意类型。
  // 如果有初始值，则类型被锁定

  // String str = '123'; // utf-16 的 字符组成
  // bool b;     // true 和 false， 都是编译时常量
  // num c;      // dart 中的 数值类型
  // int double
  // 使用强类型声明的时候，类型被锁定

  // 基础运算符
  // + - * / %

  // 字符串模板
  String s = 'hello world';
  String s1 = '输入一个大写的${s.toUpperCase()}';
  print(s1);

  var s2 = 'hello' + '' + 'world';
  print(s2);
}