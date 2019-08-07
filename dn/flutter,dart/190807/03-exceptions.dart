main(List<String> args) {
  // 异常
  // Exception
  // Error

  // 抛出异常
  // throw FormatException('格式异常');

  // 抛出 Error
  // throw NullThrownError();

  // 抛出一个 非 null的对象
  // throw 'this is a Exception';

  // 异常捕获 try catch
  try {
    // throw NullThrownError();
    throw FormatException('格式异常');
  } on Error {
    print('只捕获到 Error');
  } on Exception {
    print('只捕获到 Exception');
  } catch(err, s) {
    // catch 两个参数 1：抛出的异常对象， 2：StackTrace 对象堆栈信息
    print(err);
    print(s);
  }
}