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
