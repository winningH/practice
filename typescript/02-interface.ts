// 定义interface一般首字母大写
// 属性必须和类型定义的完全一致
interface Person1 {
  name: string
  age: number
}

const p1: Person1 = {
  name: 'lin',
  age: 18
}

// 可选属性
interface Person2 {
  name: string
  age?: number
}

const p2: Person2 = {
  name: 'zhang'
}

// 只读属性
interface Person3 {
  readonly id: number
  name: string
  age: number
}

const p3: Person3 = {
  id: 1,
  name: 'huang',
  age: 20
}

// 改变只读属性时会报错
// p3.id = 2 Cannot assign to 'id' because it is a read-omly property

// 描述函数类型
interface ISum {
  (x:number, y: number):number
}

const add:ISum = (num1, num2) => {
  return num1 + num2
}


// 自定义属性（可索引的类型）
interface RandomKey {
  [propName: string]: string
}

const obj: RandomKey = {
  a: 'hello',
  b: 'typescript'
}

// 如果把属性名定义为number类型，就是一个类数组
interface LikeArray {
  [prop: number]: string
}

const arr: LikeArray = ['1', '2', '3']


// duck typing(鸭子类型)
// interface FunctionWithProps {
//   (x:number): number
//   name: string
// }

// const fn: FunctionWithProps = (x) => {
//   return x
// }

// fn.name = "hello world"
