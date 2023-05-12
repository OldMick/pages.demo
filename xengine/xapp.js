 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲主伐框架類
 */
(function(win){
   //簡單的程序事件監聽器
   var _appEventListener = win.AppEventListener = EventListener.extend({
	   init:function(param)
	   {
		   //監聽器是否生效
		   this.enabled = true;
		   this.onBeforeRender = param["beforeRender"]||this.onBeforeRender;		   
           this.onAfterRender = param["afterRender"]||this.onAfterRender;
	   },
       //遊戲主循環執行渲染操作前觸發
       onBeforeRender:function(){return true;},
       //遊戲主循環執行渲染操作後觸發
       onAfterRender:function(){return true;}
   });

   var _game = win.Game = Class.extend({
     //保存所有的監聽器
	 listeners:[],
	 //場景管理器
	 sceneManager:null,
     //初始化方法
	 init:function()
	 {	   
	   this.sceneManager = new SceneManager();
	   this.paused = false;
	 },
     //添加監聽器
	 addListener:function(ln)
     {
       this.listeners.push(ln);
	 },
     //清空監聽器列表
     clearListener:function()
     {
	   this.listeners.length = 0;
     },
     //遊戲主循環
     mainloop:function()
	 {
	  //執行遊戲主循環
      var ltns = this.listeners;
	  //觸發監聽器渲染前事件
	  for(var i=0,len = ltns.length;i<len;i++)
		{
		  ltns[i].enabled&&ltns[i].onBeforeRender();
		} 
	  //獲取當前場景，更新，並渲染
      var scene = this.sceneManager.getCurrentScene();
	  if(scene)
	  {
	    scene.update();
	    scene.render();
	  }
      //觸發監聽器渲染後事件	  
	  for(var i=0;i<len;i++)
	   {
		  ltns[i].enabled&&ltns[i].onAfterRender();
	   }
	 },
	 //執行遊戲
	 run:function(fps)
	 {     
	   //設定fps默認為60幀/秒 
	   fps = fps||60;
       var self = this,
	       spf = (1000/fps)|0;
	   //開啟幀數跟蹤
	   FrameState.start();
       self.tHand = setInterval(function(){         
          //更新幀狀態
          FrameState.update();	
		  if(!self.paused)
		   {
			  self.mainloop();
		   }
	   },spf); 
	 },
     //暫停遊戲
	 pause:function()
	 {
		 this.paused = true;
	 },
	 //終止遊戲
	 stop:function()
	 {
	   clearInterval(this.tHand);
	 }
   });
}(window))