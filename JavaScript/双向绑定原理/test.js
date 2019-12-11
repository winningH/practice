(function (window, factory) {
  window.Vue = factory();
})(this, function () {
  // 默认配置
  var _DEFAULT_ = {
    el: "body",
    data: {}
  }
  var Vue = function (options) {
    // this Vue实例对象
    this.extend(this, _DEFAULT_, options);
    this.observer();
  }
  Vue.prototype = {
    extend: function () {
      console.log(arguments)
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          this[key] = arguments[i][key]
        }
      }
    },

    observer: function () {
      for (let key in this.data) {
        Object.defineProperty(this.data, key, {
          get: function () {
            return this.str
          },
          set: function (val) {
            console.log(app)
            var Element = app.querySelectorAll("[v-model=" + key +"]")
            for (var i = 0; i < Element.length; i++) {
              Element[i].value = val
              Element[i].innerText = val
            }
            this.str = val
            console.log(val)
          }
        })

      }
    }
  }
  return Vue;
});

