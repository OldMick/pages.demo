 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲場景類
 */
(function(win){
   //場景監聽器
   var _sceneEventListener = win.SceneEventListener = EventListener.extend({
	   init:function(param)
	   {
		   //監聽器是否生效
		   this.enabled = true;
		   this.onBeforeRender = param["beforeRender"]||this.onBeforeRender;
           this.onAfterRender = param["afterRender"]||this.onAfterRender;
	   },
       //場景渲染操作前觸發
       onBeforeRender:function(scene){return true;},
       //場景渲染操作後觸發
       onAfterRender:function(scene){return true;}
   });
   //場景類   
   var _scene = win.Scene = Class.extend({
	   init:function(arg)
	   {
		  arg = arg||{};
          //場景名稱 
          this.name = arg.name||("Unnamed_"+(++_scene.SID)); 
		  //位置信息
		  this.x = arg.x||0;
		  this.y = arg.y||0;
		  this.w = arg.w||320;
		  this.h = arg.h||200;
		  this.color = arg.color||"black";
		  //場景容器
		  this.holder = $("<div id='sc_"+this.name+"' style='position:absolute;overflow:hidden;left:0px;top:0px'></div>")
		  //綁定的canvas元素,以後的精靈都在這個canvas上進行繪製
		  this.cvs = $("<canvas id='cv_"+this.name+"' style='z-index:-1;position:absolute;left:0px;top:0px'></canvas>");
		  this.ctx = this.cvs[0].getContext("2d");
		  this.setPos();
		  this.setSize();
		  this.setColor(this.color);
		  this.holder.append(this.cvs);
		  $(document.body).append(this.holder);
		  //保存所有的監聽器
	      this.listeners = [],
		  //記錄所有的渲染對象
		  this.rObjs = [];
		  //命名的渲染對象，便於根據名稱快速查找對象
		  this.namedRObjs = {};
	   },
	   //創建渲染對象
	   createRObj:function(className,arg)
       {		
		  className = className||"RenderObj"; 
          var obj =  ClassFactory.newInstance(className,arg);
		  this.addRObj(obj);
		  return obj;
	   },
       //添加到rObjs中
	   addRObj:function(renderObj)
       {
		  renderObj.owner = this;
		  this.rObjs.push(renderObj);
          this.namedRObjs[renderObj.name] = renderObj;
	   },
	   //刪除對象
	   removeRObj:function(renderObj)
       {
		 this.removeRObjByName(renderObj.name);
	   },
       //根據名稱移出對象
	   removeRObjByName:function(name)
       {
          var obj = this.namedRObjs[name];
		  if(obj!=null)
		  {		  
		    delete this.namedRObjs[name];		  
		  }
		  //從數組中移出對象
		  ArrayUtil.removeFn(this.rObjs,function(rObj){return rObj.name===name;}); 
	   },
        //根據名稱查找對象
	   getRObjByName:function(name)
	   {
		   return this.namedRObjs[name];
	   },
       //清除所有渲染對象
       clearRObj:function()
       {
          this.rObjs = [];
		  this.namedRObjs = {};
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
	   //更新場景
	   update:function()
       {
		   for(var i = 0;i<this.rObjs.length;i++)
		   {
			   this.rObjs[i].update();
		   }
	   },     
	   //執行渲染	   
	   render:function()
       {
		   var ltns = this.listeners;
		   //先清除場景，再渲染
           this.clear(); 
		   //執行渲染前監聽器
           for(var i=0,len = ltns.length;i<len;i++)
			{
		       ltns[i].enabled&&ltns[i].onBeforeRender(this);
		    } 			
		   this.renderRObj();
		   //執行渲染後監聽器         
		   for(var i=0;i<len;i++)
		    {
			  ltns[i].enabled&&ltns[i].onAfterRender(this);
		    }
	   },
	   //渲染所有對象
	   renderRObj:function()
       {
		   for(var i = 0,len = this.rObjs.length;i<len;i++)
		   {

			   this.ctx.save();
			   this.rObjs[i].isVisible&&this.rObjs[i].render(this.ctx);
			   this.ctx.restore();
		   }
	   },
	   //設置位置
	   setPos:function(x,y)
	   {
		   this.x = x||this.x;
		   this.y = y||this.y;
		   this.holder.css("left",this.x).css("top",this.y);
	   },
       //設置大小
       setSize:function(w,h)
	   {
		   this.w = w||this.w;
		   this.h = h||this.h;
		   this.holder.css("width",this.w).css("height",this.h);
		   this.cvs.attr("width",this.w).attr("height",this.h);
	   },       
       //設置canvas背景
	   setColor:function(color)
	   {		   
		   this.color = color||"black";
           this.holder.css("background-color",this.color);
	   },
	   //清除canvas背景
	   clear:function()
       {
          this.ctx.clearRect(0,0,this.w,this.h);
	   },
       //顯示
	   show:function()
	   {
		   this.holder.show();
	   },
       //隱藏
	   hide:function()
       {
		   this.holder.hide();
	   },
	   fadeOut:function(time,fn)
       {
		   this.holder.fadeOut(time,fn);
	   },
       fadeIn:function(time,fn)
       {
		   this.holder.fadeIn(time,fn);
	   },
	   //設置背景,pattern:0(居中),1(拉伸),默認(平鋪)
	   setBGImg:function(imgURL,pattern)
       {
          this.holder.css("background-image","url("+imgURL+")");
		  switch(pattern)
		  {
			  case 0:
                  this.holder.css("background-repeat","no-repeat");
			      this.holder.css("background-position","center");
				  break;
			  case 1:
                  this.holder.css("background-size",this.w+"px "+this.h+"px ");
				  break;
		  }
	   },
       //清除相關所有資源
	   clean:function()
       {
		  this.listeners = null;
		  this.cvs.remove();
		  this.holder.remove();
		  this.cvs = this.holder = this.ctx = null;
	   }
   });
   //記錄scene編號
   _scene.SID = 0;
   _scene.ClassName = "Scene";
   //註冊類到類工廠中
   ClassFactory.regClass(_scene.ClassName,_scene);
}(window))