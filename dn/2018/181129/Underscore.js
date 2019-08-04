/*
* @Author: Max
* @Date:   2018-11-13 20:17:56
* @Last Modified by:   Max
* @Last Modified time: 2018-11-22 23:01:19
*
*/
(function( root ){
  //减少原型链的查询
	var push = Array.prototype.push,
      ObjProto = Object.prototype;
  //浏览器支持 ES5的方法就优先使用
  var nativeKeys = Object.keys;
   var _ = function( obj ){
     if( !(this instanceof  _) ){
        return new _(obj);
     }
     this.wrap = obj;
   }
   //commonjs 规范  js 社区
   typeof module !== "undefined" && module.exports ? module.exports = _ : root._ = _;
   // AMD 规范  requirejs    客户端模块加载器如何实现
   if( typeof define === "function" && define.amd ){
      define( "underscore", [], function(){
          return {
          	   _:_,
          }
      });
   }
   /*
    数组去重
    target  目标源
    callback
    */
   _.uniq = function( target, callback ){
   	  var result = [];    //去重之后的结果  [1,2,3,4,5,2,4,5,3]
      for( var i=0; i<target.length; i++ ){
      	var computed = callback ? callback(target[i]) : target[i];
        if(result.indexOf(computed) === -1 ){
           result.push(computed)
        }
      }

      return result;
   }

   _.functions = function( obj ){
    var result = [];
    var key;
    for( key in obj ){
         result.push(key);
    }
    return result;
   }

   // 遍历 数组  对象
   _.each = function( target, callback ){
   	   var key,i = 0;
       if( _.isArray(target) ){
       	 var length = target.length;
          for( ;i<length; i++ ){
             callback.call( target, target[i], i );
          }
       } else {
          for( key in target ){
             callback.call( target, key, target[key] );
          }
       }

   }

   //开启链接式的调用
   _.chain = function( obj ){   //目标源
     var instance = _( obj );     // {wrap: 目标源  _chain:true}
     instance._chain = true;   //_chain 标识当前的实例对象支持链接式的调用
     return instance;
   }

   //辅助函数  result(this, instance )
   var result = function( instance, obj ){
      //_(obj)    _chain
      return instance._chain ? _(obj).chain() : obj;   //false  instance
   }

   _.prototype.value = function(){
    return this.wrap;
   }
   //类型检测
   _.isArray = function( array ){
     return toString.call( array ) === "[object Array]";
   }

   _.each(["Function", "String", "Object" , "Number"], function( name ){  //key  value
          _["is"+name] = function( obj ){
          	 return toString.call( obj ) === "[object "+name+"]";
          }
   });

  /*
    obj       目标源对象   必须
    iteratee   迭代器   ( 不仅可以是函数 对象  字符串  字面量的值 )   选择
    context    绑定的上下文对象    选择
   */
  _.map = function( obj, iteratee, context ){
     //生成不同功能迭代器   函数
     var iteratee = cb( iteratee, context );   //return function(){}
     //如果你给我传入是object对象   获取key 存储在一个数组中
     var keys =  !_.isArray(obj) && _.keys(obj) ;
     var length = (keys || obj).length;   //3
     var result = Array(length);
     for(var index = 0; index<length; index++ ){
        //object = 属性   array = 下标
        var currentKey = keys ? keys[index] : index;
        result[index] = iteratee( obj[currentKey], index, obj );
     }

     return result;
  }
  // hasEnumBug
  var hasEnumBug = !{valueOf: null}.propertyIsEnumerable('valueOf');
  var noEnumProps = ["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"];
  function collect( obj, keys ){
     var nElen =  noEnumProps.length,
         constructor = obj.constructor,   //构造函数
         proto = constructor.prototype || ObjProto;   //原型对象
         while( nElen-- ){
           var key = noEnumProps[nElen];
           if( key in obj &&obj[key] !== proto[key] ){
                keys.push(key);
           }
         }

  }
  _.keys = function( obj ){
     //允许错误
     if( !_.isObject(obj) ){ return [] };
     //浏览器是否支持Object.keys
     if( nativeKeys ){return nativeKeys(obj) };
     //遍历
     var keys = [];
     for( var key in obj ){     //IE9>   Keys[name]    {name:"max", valueOf:"value"}
         keys.push(key);
     }
     // IE9 兼容性的问题   不可枚举属性的集合
     if(hasEnumBug){collect( obj, keys )}
    return keys;
  }
  var cb = function( iteratee, context, args ){
      if( iteratee == null ){
        return _.identity;
      }
      if( _.isFunction(iteratee) ){
        return optimizeCb( iteratee, context, args);  //optimizeCb优化迭代器
      }
      if( _.isObject(iteratee) ){
        return ;
      }

      //其他   字符串
  }
   // optimize   优化 回调
  var optimizeCb = function( func, context, args  ){
     //context 是否有值  上下文对象是否设置
     if( context == void 0 ){return func;}
     switch( args == null ? 3 : args ){
      case 1: return function(value){
        return func.call(context,value);
      }
      //1 2 3 4
      case 3: return function( value, index, obj ){
         return  func.call( context, value, index, obj );
      }
      case 4: return function( memo, value, index, obj ){
         return func.call( context, memo, value, index, obj );
      }
     }
  }

  _.times = function( n, iteratee, context ){
    var result = Array(Math.max(0,n));
    iteratee = optimizeCb( iteratee, context, 1 );   //itertee
    for(var i= 0; i< n; i++ ){
     result[i] = iteratee( i );
    }
    return result;
  }
  /*
    createReduce  工厂函数生成reduce
   */
  var createReduce = function( dir ){
    //累加
    var reduce = function( obj, iteratee, memo, init ){
    var keys =  !_.isArray(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir>0 ? 0 : length-1;   //确定累加的方向
        if(!init){
          memo = obj[keys ? keys[index] : index];  //1   obj第一项数据的成员
          index+=dir;   //1
        };
        for( ;index >= 0 && index<length; index+=dir ){
           var currnteKey = keys ? keys[index] : index;
           memo = iteratee(memo, obj[currnteKey], currnteKey, obj )
           //console.log(memo+"@@@@")
        }
      return memo;
    }
    //memo  最终能累加的结果     每一次累加的过程
    return function( obj, iteratee , memo, context ){
      //init    初始化了memo
      var init = arguments.length>= 3;
      return reduce( obj, optimizeCb(iteratee, context, 4), memo, init );
    }
  }
  _.reduce = createReduce( 1 );   //1 || -1    dir
  _.identity = function( value ){
     return value;
  }

  /*
   包装器  包装函数fn  使他支持rest参数
  */
   _.restArgs = function( fn ){  //fn  add 源函数
      return function(){    //参数传递  arguments  实参
       // arguments  ?
       var argsLen = fn.length;   //3
       var startIndex = argsLen-1;  //2  rest 位置
       //为rest 参数开辟数组存储实参
       var args = Array(argsLen);
       //rest 参数
       var rest = Array.prototype.slice.call(arguments,startIndex);
       //单一参数的处理
       for(var i=0; i<startIndex; i++ ){  //2
           args[i] = arguments[i];
       }
       //["zs","ls",["wlw", "lmz"]]  ["形参","形参",["rest[0]", "rest[1]"]]
       args[startIndex] = rest;

       return fn.apply(this, args );   //this  window
      }
   }

  //需要逃逸的字符   反逃逸  编译  &amp;
  var escapeMap = {   //反转
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  _.invert = function( obj ){
    var result = {};  //反转的结果
    var keys = _.keys(escapeMap);
    for(var i = 0; i<keys.length; i++){
       result[obj[keys[i]]] = keys[i];   //属性反转成值   '&'
    }

    return result;
  }
  var unescapeMap = _.invert(escapeMap);
  // 工厂函数
  var createEscaper = function(map) {
    var escaper = function(match) {

      return map[match];
    };

    //匹配正则
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = new RegExp(source);
    var replaceRegexp = new RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  //字符串逃逸
  _.escape = createEscaper(escapeMap);
  //字符串反逃逸
 _.unescape = createEscaper(unescapeMap);

  //解析规则
  _.templateSettings = {
    //执行体  js逻辑代码
    evalute:/<%([\s\S]+?)%>/g,
    //插入变量
    interpolate:/<%=([\s\S]+?)%>/g,
    //逃逸
    escape:/<%-([\s\S]+?)%>/g,
  }
   /*
     模板引擎
     text  模板字符串
     settings 自定义配置
    */
  _.template = function( text, settings ){
    //extend({},settings,_.templateSettings)
    settings = _.templateSettings;
    var matcher =RegExp([
       settings.escape.source,
       settings.interpolate.source,
       settings.evalute.source,
      ].join("|"),"g");

    //source  字符串保存函数体内部要执行的主体内容   执行头
    var source ="_p+='";    //_p+='
    text.replace(matcher,function( match, escape, interpolate, evalute){
      //字符串切割
      if(escape){

      }else if(interpolate){
       //((_t=interpolate) ==null?" ":_t);  _p+='((_t=interpolate) ==null?" ":_t)
       source +="'+\n((_t=("+interpolate+")) ==null?'':_t)+\n'";

      }else if(evalute){

      }
    });

    source+="';";    // _p+='((_t=interpolate) ==null?" ":_t)';
    console.log(source);
    //with 限定作用域
    if(!settings.variable)source='with(obj||{}){\n'+source+'}\n';
    source="var _t,_p='';"+source+'return _p;\n';
    //渲染函数  "obj"  == data   "_" ==undesocre   source ==  函数主体内容
    var render = new Function("obj","_",source);
    var template = function(data){
        return render.call(this,data,_);
    }

    return template;
  }

  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random()*(max-min+1))
  }

  _.values = function(obj) {
    var keys = _.keys(obj),
        length = keys.length,
        values = Array(length);
    for (var i = 0; i<length; i++) {
      values[i] = obj[keys[i]]
    }
    return values;
  }

  // shuffle 洗牌 乱序
  _.shuffle = function(obj) {
    var set = _.isArray(obj) ? obj : _.values(obj),
        length = set.length,
        shuffle = Array(length) // 乱序之后的数组对象

    for (var index = 0; index < length; index++) {
      // 生成一个随机数  1：整数  2：范围0~length-1
      rand = _.random(0,index);
      shuffle[index] = shuffle[rand]
      shuffle[rand] = set[index]
    }
    return shuffle
  }

  // 获取时间戳
  _.now = Date.now || function () {
    return new Date().getTime()
  }

  _.debounce = function(func, wait, n) {
    var args, timeout, time;
    // 处理函数
    var later = function() {
      // 获取时间戳
      var last = _.now() - time;
      if (last < wait) {
        timeout = setTimeout(later, wait-last)
      } else {
        timeout = null;
        if(!n) {
          func.apply(this, args)
        }
      }
    }
    return function () {
      args = arguments
      // 获取调用时的时间戳
      time = _.now()
      // 是否要立即调用处理函数 n 有值 第一次调用处理函数
      var callNow = n && !timeout;
      // 无论callNow 是否有值都会设计一个定时器
      if (!timeout) {
        timeout = setTimeout(later, wait )
      }
      if(callNow) {
        func.apply(this, arguments)
      }
    }
  }

  //mixin
  _.mixin = function( obj ){
     _.each( _.functions( obj ), function( name ){
     	var func = obj[name];
		_.prototype[name] = function(){
			var args = [this.wrap];     // 处理好数据最终的结果
			push.apply( args, arguments );
      // this         instance    == obj
        return result(this, func.apply( this,args));   //处理好数据最终的结果
		}
     });
   }

  _.mixin( _ );
})( this );

