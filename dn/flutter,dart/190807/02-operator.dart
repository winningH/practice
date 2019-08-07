main(List<String> args) {
  // 操作符
  // ?. 类似于 .用于访问 对象中成员
  // 有时候 不知道 左边的对象是否存在
  String a; // 声明 但是没有初始化 null
  a = '今天是七夕';
  print(a?.length);

  // ~/ 取商
  print(2/3); // 转换 double
  print(2~/3);
  print(2%3);

  // 类型操作符
  // as is
  // as 作为类型转换 只能往 子类型转
  num i = 1;
  num d = 1.0;
  int iNum = i as int;
  print(iNum);
  print(d as double);

  // is 是否为 指定的数据类型
  print(d is num);

  // ??
  bool isFinish;
  isFinish = isFinish ?? false;
  print(isFinish);

  isFinish ??= false;

  // .. 级联运算
  StringBuffer sb = StringBuffer();
  sb
    ..write('aaa')
    ..write('bbb')
    ..write('ccc');
  print('StringBuffer $sb');


  var collection = [0, 1, 2];
  // forEach
  collection.forEach((item) => print('forEach $item'));

  // for -in
  for (var i in collection) {
    print('for-in：$i');
  }
}