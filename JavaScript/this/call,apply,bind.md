## call, apply
* 共同点： 都能够改变函数执行时的上下文，将一个对象的方法交给另一个对象来执行，并且都是立即执行的,调用者都必须是函数
* 区别： 参数的写法上不同
  - **call**
    * call的第一个参数，是一个对象。Function的调用者，将会指向这个对象。如果不传，则默认为全局对象window
    * 第二个参数开始，可以接收任意参数
      ```
      function func (a,b,c) {}

      func.call(obj, 1,2,3)
      // func 接收到的参数实际上是 1,2,3

      func.call(obj, [1,2,3])
      // func 接收到的参数实际上是 [1,2,3],undefined,undefined
      ```
  - **apply**
    - 只接收两个参数， 第一个参数规则跟call一样
    - 第二个参数必须是数组或者类数组
      ```
      func.apply(obj, [1,2,3])
      // func 接收到的参数实际上是 1,2,3

      func.apply(obj, {
          0: 1,
          1: 2,
          2: 3,
          length: 3
      })
      // func 接收到的参数实际上是 1,2,3

## bind
* bind()创建一个新的函数
* **bind 方法的返回值是函数，并且需要稍后调用，才会执行**。而 apply 和 call 则是立即调用。

