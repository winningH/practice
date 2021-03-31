(function () {
    var jQuery = function (param) {
        var o = new jQuery.prototype.init(param);
        return o;
    }
    jQuery.prototype = {
        init: function (param) { // 获取对象
            this[0] = document.getElementById(param.substring(1))
            return this;
        },
        css: function (sname, sval) {
            this[0].style[sname] = sval;
        }
    }
    // 只要是构造函数，都有原型属性
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery; // 把jq对象赋值给全局对象
})()