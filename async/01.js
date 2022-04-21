let n = 0
;(async function a(num) {
  console.log('1-', num)
  b(num++)
  console.log('2-', num)
})(n)

async function b(num) {
  console.log('3-', num)
  await c(num++)
  console.log('4-', ++num)
}

async function c(num) {
  console.log('5-', num)
  setTimeout(() => {
    console.log('6-', num)
  })
  console.log('7-', ++num)
}

new Promise(resolve => {
  console.log('8-', n)
  resolve(n)
}).then(() => {
  console.log('9-', n++)
})

console.log('10-', n++ > n)
console.log('11-', n)

/**
 * 1- 0
 * 3- 0
 * 5- 0
 * 7- 1
 * 2- 1
 * 8- 1
 * 10- false
 * 11- 1
 * 4- 2
 * 9- 1
 * 6- 1
 */
