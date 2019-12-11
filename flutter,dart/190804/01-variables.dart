/// 三个斜线  文档注释

//  当行注释

/**
 *  多行注释
*/

void main () { // void 可以省略， 如果省略的话， 默认返回 null
  /// 变量的声明
  /// var dynamic Object
  // dynamic d1;
  // d1 = "dart";
  // d1 = 123;
  // d1.test();    // 编译时不报错， 运行时报错

  // Object d2;
  // d2 = 123;
  // d2 = "dart2";
  //  d2.test();    // 调用不存在的test 方法， 编译时 报错

  /// 没有初始化的值，都是null， 在运行时，会报错
  bool isEmpty = false;
  if (isEmpty) {
    print("变量为空");
  }

  /// 常量， 使用const ,final 声明时，变量类型可以省略
  // const String a = "123";
  // const a = "123";

  // final b = 20;

  // final 与 const 初始化之后，不能再更改值

  DateTime; //类级别 的 常量， 使用static const
  // DateTime static const Monday = 1;

  // const 可以使用其它 const 常量的值来初始化
  // const width = 100;
  // const height = 80;
  // const square = width * height;

  // const 赋值的时候，List
  // const List list = const [1, 2, 3];  // dart 2.0之前，需要在前面加上 const；2.0之后，const 可以省略

  var varList = const [1, 2, 3, 4, 5];
  varList = [1];
  print(varList);

  final finalList = [1, 2, 3, 4, 5];
  finalList[0] = 10;
  // final finalList1 = const [1, 2, 3, 4, 5];
  // finalList1[0] = 10; // 报错， 有const 时不能修改
  print(finalList);

  // const constList = [1, 2, 3, 4, 5];
  //  constList[2] = 30; const 声明具有传递性， 报错

  // identical 用于检查两个引用是否指向同一个对象
  const num1 = 10;
  const num2 = 10;
  print(identical(num1, num2));
}