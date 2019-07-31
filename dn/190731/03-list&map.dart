main(List<String> args) {
  // 数组 list
  // 对象 map

  var arr = ['jack', 'amy', 'tony'];
  var arr2 = List.of([1, 2, 3]); // 构造函数

  arr2.add(500);
  arr2.forEach((v) => print('$v'));

  var map1 = {'name': 'Tom', 'sex': 'male'};  // 字面量
  var map2 = new Map(); // dart 在2.0以后，new 可以省略
  map2['name'] = 'Jack';
  map2['sex'] = 'famale';
  map2.forEach((k, v) => print('$k===>$v'));

  // 泛型
  // arr2 的类型是 List<int>
  List<int> ls = [1, 2, 3];
  List<String> ls2 = ['1', '2', '3'];
}