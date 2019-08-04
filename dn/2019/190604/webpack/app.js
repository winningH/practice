// es6的引入打包
// import {add} from "./es6"
// console.log(add(1,2))

// CommonJs的打包
// var meth = require("./common.js")
// console.log(meth.add(2, 3))
// console.log(meth.sub(2, 3))

// AMD 的打包
require(['./amd.js'], function(a) {
    console.log(a.mul(2, 3))
})