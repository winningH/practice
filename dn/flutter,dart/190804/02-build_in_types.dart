main(List<String> args) {
  int i = 100;
  double d = 1.0;

  // bitLength 判断 int 值 需要多少 bit
  int bitLength = i.bitLength;
  print(bitLength);

  // 类型转换
  // String 类型 转 int
  int i2 = int.parse('123');
  print(i2);

  double d2 = 1; // 把int 类型复制给 double 的时候， int会自动转成double
  print('d2: $d2');

  // int 转 String
  String str = 123.toString();
  print(str);

  /// 字符串 String
  var name = "huang";
  var names = 'zhangsan $name';
  var names1 = 'zhangsan ' "lisi " '$name';
  print(names);
  print(names1);

  var str1 = '''
    床前明月光，\n
    疑是地上霜。
  ''';
  // r 不转义
  var str2 = r'''
    床前明月光，\n
    疑是地上霜。
  ''';
  print(str1);
  print(str2); // \n 也会被打印出来

  /// StringBuffer
  var sb = StringBuffer(); // new 可省略
  // sb.write('aaa');
  // sb.write('bbb');
  // sb.write('ccc');
  sb
    ..write('aaaaa')
    ..write('bbbbb')
    ..writeAll(['111', '222', '333']);
  print(sb); // sb 是一个StringBuffer 对象， 调用了toString()

  /// List 数组
  List growableList = List(); // 不传参，自动长度
  growableList..add(1)..add(2)..add(3);
  print('growableList $growableList');

  // 固定长度
  var list = List(3); // 长度为3
  list[0] =1;
  list[1] = 2;
  print('list $list');

  // 元素固定类型
  var typeList = List<int>();
  typeList
    ..add(1)
    ..add(2)
    ..addAll([3 ,4 ,5]);
  print('typeList $typeList');
  print('typeList.first: ${typeList.first}');
  print('typeList.last: ${typeList.last}');
  // length isEmpty isNotEmpty
  Iterable reversed = typeList.reversed;
  print('typeList.reversed: $reversed');

  // 增删改查 排序 洗牌 复制
  // insert 插入 insertAll
  // remove removeAt

  typeList.shuffle();
  print('typeList.shuffle: $typeList');

  // subList
  // + 合并数组

  /// Maps 键值对集合
  var dynamicMap = Map();
  dynamicMap['name'] = 'zhangsan';
  dynamicMap['age'] = 20;
  print('dynamicMap: $dynamicMap');

  // 强类型
  var map = Map<int, String>();
  map[1] = '张三';
  map[2] = "李四";
  map[3] = '王五';
  print('map: $map');
  // isEmpty isNotEmpty length keys values
  print('map.values: ${map.values}');

  /// Set 集合
  /// 无重复 列表
  var dynamicSet = Set();
  dynamicSet..add('flutter')..add('dart')..add(1)..add(1);
  print('dynamicSet: $dynamicSet');

  var set1 = {'a', 'b'};
  var set2 = {'a', 'c', 'd'};
  var difference12 = set1.difference(set2);
  var difference21 = set2.difference(set1);
  print(difference12);
  print(difference21);

  // 交集
  print('${set1.intersection(set2)}');
  // 并集 union
  print('${set1.union(set2)}');

  /// Runes 符号字符
  String runesStr = '\u{1f605}';
  print(runesStr);
  print(runesStr.length);       // 2个 16位字符
  print(runesStr.runes.length); // 表示 占有1个 32位字符

  Runes runes = Runes('\u{1f605}');
  var runesStr1 = String.fromCharCodes(runes);
  print(runesStr1);
}