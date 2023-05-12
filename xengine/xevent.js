 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲事件監聽類
 */
 (function(win){
	  var _EListener = win.EventListener = Class.extend({
		  init:function()
		  {
			  throw Error("This class must be inherited");
		  }
	  })
      //簡單的事件對象	  
	  var _event = win.Event = Class.extend({
		  init:function(src,obj,method)
		  {
			  this.src = src;
			  this.obj = obj;
			  this.method = method;
		  },
          exec:function()
		  {
			  this.method&&this.method.call(this.obj,this.src);
		  }
	  })
 }(window))