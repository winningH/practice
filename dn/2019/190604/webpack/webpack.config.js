module.exports = {
	mode: "development",
	// 入口
	// entry: "./app.js",
	// entry: ["./app.js", "./app1.js"],
	// entry: {
	// 	main: "./app.js",
	// 	app1: "./app1.js"
	// },
	entry: {
		"app": './app.js'
	},
	// 出口
	output: {
		filename: "[name].js"
	}
}