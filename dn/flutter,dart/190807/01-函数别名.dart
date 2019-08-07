main(List<String> args) {
  // 函数别名
  MyFunc myFunc;

  // myFunc 可以去 指向 任何相同签名的函数
  myFunc = subtract;
  myFunc(4, 2);

  myFunc = divide(5, 2);

  caculator(10, 20, subtract);
}

// 定义函数的别名
typedef MyFunc(int a, int b);

// 定义几个函数
subtract(int a, int b) {
  print('substract: ${a - b}');
}

divide(int a, int b) {
  print('divide: ${a / b}');
}

caculator(int a, int b, MyFunc func) {
  func(a, b);
}