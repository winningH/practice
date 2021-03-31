function getArgs(args) {
	return args.reduce((prev, cur, index) => {
		console.log(prev, cur, index)
		return prev + cur
	})
}

let arr = []
for (var i = 1; i <= 100; i++) {
	arr.push(i)
}

let sum = getArgs(arr)
console.log(sum)