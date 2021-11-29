let arr80 = new Array().fill(80)

for (let i = 1; i <= 20; i++) {
  for (let j = 0; j <4; j++) {
    arr80.push(i)
  }
}

let b = []
for (let i = 0; i < 15; i++) {
  let randomNumber = Math.ceil(Math.random() * 20)
  b.push(randomNumber)
}

function checkB(b) {
  let c = b.reduce(function (prev, next) {
    prev[next] = prev[next] + 1 || 1
    return prev
  }, {})
  
  console.log(c)
  console.log(Object.values(c))
  let len = Object.keys(c).length
  if (len !==5 ) return 0
  let num = Object.values(c).every(item => item === 3)
  return num  ? 1  : 0
}

console.log(arr80)
console.log(b)
// let c = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]
let result = checkB(b)
console.log(result)