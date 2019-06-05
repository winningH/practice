/*
* @Author: Max
* @Date:   2018-12-04 20:26:13
* @Last Modified by:   Max
* @Last Modified time: 2018-12-04 22:41:47
* 模块的生命周期
*/
(function( root ){
  var data = {};
  var anonymousMeta
  var cahceMods = {};
  //模块的生命周期
  var status = {
  	 FETCHED: 1,   //获取模块的uri
  	 SAVED: 2,    // 元数据存储在缓存中
  	 LOADING: 3,   //加载模块的依赖项
  	 LOADED: 4,   //准备执行依赖项模块
  	 EXECUTING: 5,  //正在执行  加载模块
  	 EXECUTED: 6,    // 返回接口对象
  }
 var isArray = function(obj){
   return toString.call(obj) === "[object Array]";
  }
 var isFunction = function(obj){
   return toString.call(obj) === "[object Function]";
 }
 var seajs = root.seajs = {
     version:"1.0.0",
  }

  seajs.request = function(url, callback) {
    var node = document.createElement("script")
    node.scr = url
    document.body.appendChild(node)
    node.onload = function() {
      node.onload = null
      document.body.removeChild(node) // 定义a模块 callback怎么获取
      callback()
    }
  }
 //构造函数
 function Module( uri, deps ){
   this.uri = uri;
   this.deps = deps||[];
   this.exports = null;   //接口对象
   this.status = 0;
   this._waitings = {};  //我有几个依赖项
 }

 Module.prototype.load = function(){
    var mod = this;   // 携带了主模块中deps 依赖
    mod.status = status.LOADING;
    var uris = mod.resolve(); //获取依赖模块的绝对路径
    var len = uris.length;
    var m;
    for(var i=0; i<len; i++ ){
        m = Module.get(uris[i]); //主模块下的子模块存储在缓存中
        if(m.status < status.LOADING ){
          m._waitings[uris[i]] = m._waitings[uris[i]] || 0;
        }
    }
    //准备执行依赖项模块
    mod.onload();
    // 依赖项
    var requestCache = {}
    for (var i = 0; i < len; i++) {
      m = Module.get(uri[i])  // Module实例对象
      if(m.statuc < status.FETCHED) {
        m.fetch(requestCache)
      }
    }

    for (uri in requestCache) {
      requestCache[uri]()
    }
 }

 Module.prototype.fetch = function(requestCache) {
  var mod = this
  mod.status = status.FETCHED
  var uri = mod.uri
  requestCache[uri] = sendRequest   // 发送请求 注入script

  function sendRequest() {
    seajs.request(uri, "callback")
  }

  function onRequest() {  // 当前模块的id deps uri
    if(anonymousMeta) {
      mod.save(uri, anonymousMeta)
    }
  }
 }

 //加载模块的时候调用此方法
 Module.prototype.onload = function(){
    var mod = this;
    var uris = mod.resolve(); //获取依赖模块的绝对路径
    var len = uris.length;
    mod.status = status.LOADED;
 }

 Module.prototype.save = function (uri, meta) {
   var mod = Module.get(uri)
   mod.id = uri
   mod.deps = meta.deps || []
   mod.factory = meta.factory
   mod.status = status.SAVED
 }

 Module.prototype.resolve = function(){
 	var mod = this;
 	var ids = mod.deps;
 	var uris = [];  //依赖模块的绝对路径 (地址)
 	for(var i = 0; i<ids.length; i++){
       uris[i] = Module.resolve( ids[i], mod.uri );    //生成地址
 	}
 	//console.log(uris)
 	return uris;
 }
 
 //获取子模块的接口对象
 Module.prototype.exec = function(){
 	var mod = this;
 	//防止重复执行
 	if( mod.status >= status.EXECUTING ){
       return mod.exports;
 	}
 	mod.status = status.EXECUTING;  //5
 	var uri = mod.uri;
    function require(id){
    	// 寻址
      return Module.get(require.resolve(id)).exec();   //获取接口对象
    }

    require.resolve = function(id){
      return  Module.resolve(id,uri);
    }

    var factory = mod.factory;
    var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory;

    if(exports === undefined){
    	exports = mod.exports; 
    }
    mod.exports = exports;
    mod.status = status.EXECUTED;  //6
    return exports;
 }

 Module.resolve = function( id, refUri ){
   var emitDate = {id:id, refUri:refUri};
   //emitDate.uri  模块的地址(绝对路径)
   return  seajs.resolve(emitDate.id, refUri );
 }

 //定义模块
 Module.define = function(factory){
   if(isFunction(factory)) {
    // 调用toString 方法
    deps = []
   }
   // 存储当前模块的信息 正则解析依赖项
   var meta = {
    id: '',
    uri: '',
    deps: deps,
    factory: factory
   }
   anonymousMeta = meta
 }

 
 //主模块是否存在于缓存   检测的是就根目录这个"模块"是否存在缓存
 Module.get = function(uri, deps ){
 //{"file:///C:/Users/Max/Desktop/seajs/_use_0":Module实例对象}
  return cahceMods[uri] ||(cahceMods[uri] = new Module(uri, deps));
 }
 //入口的方法
 Module.use = function( deps, callback, uri ){
   var mod = Module.get(uri, isArray(deps) ? deps: [deps] )
   //依赖项模块都加载完毕
   mod.callback = function(){
     var exports = [];   //所以依赖项模块的接口对象
     var uris = mod.resolve(); //获取依赖模块的绝对路径
     for(var i=0; i<uris.length; i++ ){
       exports[i] = cahceMods[uris[i]].exec(); //接口对象
     }
     if(callback){
     	callback.apply(root, exports);
     }
   }
   mod.load();  //开启运行模块的生命周期
 }

 var _cid = 0;
 function cid(){
   return _cid++;
 };

 //data 数组
 data.preload = [];
 //获取当前工作的目录
 data.cwd = document.URL.match(/[^?]*\//)[0];
 Module.preload = function(callback){
   var len = data.preload.length;
   if(!len){callback()}
   //先加载预先设定模块
 };
 

 seajs.use = function( ids, callback ){
    //检测有没有预先加载的模块  preload
    Module.preload(function(){
    	Module.use(ids, callback, data.cwd+"_use_"+cid() );   //虚拟的根目录
    });  
 }

 root.define = Module.define;
})( this );
