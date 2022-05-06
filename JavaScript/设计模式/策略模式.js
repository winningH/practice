/**
 * 策略模式的定义：定义⼀系列的算法，把他们⼀个个封装起来，并且使他们可以相互替换
 * 一个系统需要动态地在几种算法中选择一种。
 * 表单验证
 */

let calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}
calculateBonus('B', 20000) // 输出:40000
calculateBonus('S', 6000) // 输出:24000

// 使用策略模式
let strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  }
}
let calculateBonus2 = function (level, salary) {
  return strategies[level](salary)
}
console.log(calculateBonus2('S', 20000)) // 输出:80000
console.log(calculateBonus2('A', 10000)) // 输出:30000
