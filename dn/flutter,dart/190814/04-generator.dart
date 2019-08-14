import 'dart:async';

/// 生成器
main(List<String> args) {
  print(getSyncGenerator(10));

  var it = getSyncGenerator(10).iterator;
  print(it);
  while (it.moveNext()) {
    print(it.current);
  }
  
  print(getAsyncGenerator(10));
  StreamSubscription subscription = getAsyncGenerator(10).listen(null);
  subscription.onData(print);
}

//  同步生成器
Iterable<int> getSyncGenerator(int n) sync* {
  int k = n;
  while (k > 0) {
    yield k--;
  }
}

// 异步生成器
Stream<int> getAsyncGenerator(int n) async* {
  while (n > 0) {
    yield n--;
  }
}