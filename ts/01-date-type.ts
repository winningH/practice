// Boolean
let isDone: boolean = false;
// 与js不同，不能修改isDone数据类型
// isDone = 'string' error

// Number
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// String
let fullName: string = 'ning';
let age: number = 20;
let sentence: string = `my name is ${fullName}, I'm ${age} years old`;

// Array
let list: number[] = [1, 2, 3];
// 第二种方式是使用数组泛型，Array < 元素类型 >：
let list2: Array<number> = [1, 2, 3]

// Tuple 元祖
// 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
let x: [string, number];
x = ["hello", 10]; // ok
// x = [10, 'hello']; // error
console.log(x[0].substring(2));

// 函数中的类型约束
function greet(person:string): string {
  return 'hello' + person
}

// void类型
function warn(): void {
  // 无需retrun
}

// 类型别名，类似于接口
type FooBar = {
  foo: string,
  bar: string
}

const aliasType: FooBar = {
  foo: 'foo',
  bar: 'bar'
}

// 联合类型
let union: string | number;
union = '1'
union = 1

// 交叉类型：扩展类型
type First = {first: number}
type Second = {second: number}
type FirstAndSecond = First & Second

// 函数
// 必填参数
function greeting(person:string, msg?: string): string {
  return 'welcom:' + person + (msg ? msg : '')
}
// greeting() no ok
let per = greeting('huang')
console.log(per);

// 重载：形参或返回值的数量或类型区别多个同名函数
// 先声明再实现
function watch(cb1: () => void): void
function watch(cb1: () => void, cb2: () => void): void
// 实现
function watch(cb1: () => void, cb2?: () => void) {
  if (cb1 && cb2) {
    console.log('重载2');
  } else {
    console.log('重载1');
  }
}