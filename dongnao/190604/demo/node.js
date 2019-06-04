var a = 10;
var b = 20;
function fun (a,b) {
    return a*b
}

// 第一种导出的方式
module.exports = {
    a,
    b,
    fun
}

// 另外一种导出的方式
exports.sum = function () {};
exports.a = 10;