/**
 *  外观模式：为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使子系统更加容易使用
 *  涉及到兼容性处理，参数支持多个格式，对外暴漏统一的api
 */

function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    // 支持DOM2级事件处理方法的浏览器
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    // 不支持DOM2级但支持attachEvent
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on + type'] = fn // 都不支持的浏览器
  }
}
const myInput = document.getElementById('myinput')
addEvent(myInput, 'click', function () {
  console.log('绑定click事件')
})
