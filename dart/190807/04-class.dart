/* class Point {
  double x;
  double y;

  Point(x, y) {
    this.x = x;
    this.y = y;
  }
} */

class Point {
  num x;
  num y;

  Point(this.x, this.y);

  // 命名构造函数
  Point.fromJSON(Map json) {
    x = json['x'];
    y = json['y'];
  }

  // 重定向构造函数，使用冒号
  Point.alongXAxis(num x) : this(x, 0);
  Point.alongYAxis(x, y) : this(x, y);
}

main(List<String> args) {
  // 普通构造函数
  Point p = Point(1, 2);
  // print(p);

  // p = Point.fromJSON({'x': 10, 'y': 20});
  // print(p);
  p = Point.alongXAxis(20);
  print([p.x, p.y]);
}