let str = 'abcabcabcbbccccc'
let num =  0
let char = ''

str = str.split('').sort().join('')

let re =  /(\w)\1+/g;
str.replace(re, ($0, $1) => {
  console.log($0, $1)
  if (num < $0.length) {
    num = $0.length
    char = $1
  }
})

console.log(`字符最多的是${char}，出现了${num}次`)