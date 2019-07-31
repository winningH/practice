main(List<String> args) {
  // 常量的定义 final const
  final String a = 'abc';
  final b = 'bcd';

  // final，const 不能跟 var 使用
  const List ls = const [11, 22, 33];
  ls.add(20);

  final List ls1 = [1, 2, 3]
  ls1[0] = 11;
  print(ls1);
}