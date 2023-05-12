 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲場景管理類
 */
(function(win){
   //場景管理類   
   var _sceneman = win.SceneManager = Class.extend({
	   init:function(param)
	   {
          //以命名方式保存,便於快速通過名稱獲取
		  this.namedScenes = {};
		  //以堆棧方式保存所有場景，最後的元素為棧頂
		  this.scenes = [];		  
	   },
       //創建新的場景,通過類名和參數創建,因為scene可能有自己的子類,需要注意的是arg是必須要是數組形式
	   createScene:function(sceneClass,args){ 			 
         var sc = null;		 
		 if(arguments.length == 1)
		 {
             sc =  ClassFactory.newInstance("Scene",arguments[0]);  
		 }
		 else{
			 sceneClass = sceneClass||"Scene"; 
             sc =  ClassFactory.newInstance(sceneClass,args);
		 }
		 this.push(sc);
		 return sc;
	   }, 
       //場景重排序
	   sortSceneIdx:function()
	   {
		   for(var i=0,len=this.scenes.length;i<len;i++)
		   {
			   var sc = this.scenes[i];
			   sc.holder.css("z-index",i);
		   }
	   },
       //壓入scene場景
       push:function(scene)
	   {
		   if(!this.getScene(scene.name))
		   {
			   this.scenes.push(scene);
			   this.namedScenes[scene.name] = scene;
			   this.sortSceneIdx();
		   }		  
	   },
       //移除頂部場景
	   pop:function()
	   {
		  var sc = this.scenes.pop();
          if(sc!=null)
		  {
             sc.clean();
			 sc = null;
		  }
		  delete this.namedScenes[name]; 
		  this.sortSceneIdx();
	   },   
	   //交換場景位置
       swap:function(from,to)
	   {
		 if(from>=0&&from<=this.scenes.length-1
			&&to>=0&&to<=this.scenes.length-1)
		 {
             var sc = this.scenes[from];
			 this.scenes[from] = this.scenes[to];
			 this.scenes[to] = sc;
			 this.sortSceneIdx();
		 }         
	   },
	   //獲取某個場景的索引
	   getIdx:function(scene)
	   {		  
		   return scene.holder.css("z-index");		
	   },
	   //把某個場景移動到最頂部
	   bringToTop:function(scene)
	   {
         var idx = this.getIdx(scene);
		 if(idx!=this.scenes.length-1)
		 {
			 this.scenes.splice(idx,1);
			 this.scenes[this.scenes.length] = scene;	
			 this.sortSceneIdx();
		 }		 
	   },
	   //把某個場景移動到最底部
	   bringToLast:function(scene)
	   {
		 var idx = this.getIdx(scene);
		 if(idx!=0)
		 {
			 this.scenes.splice(idx,1);
			 this.scenes.splice(0,0,scene);
			 this.sortSceneIdx();
		 }		 
	   },
       //場景後移
       back:function(scene)
       {
		 var idx = this.getIdx(scene);
		 if(idx>0)
		 {
			 this.swap(idx,idx-1);
		 }		 
	   },
       //場景前移
       forward:function(scene)
       {
         var idx = this.getIdx(scene);
		 if(idx<this.scenes.length)
		 {			 
			 this.swap(idx,idx+1);
		 }		 
	   },
       //根據名稱獲取場景
	   getScene:function(name)
	   {
		 return this.namedScenes[name];
	   }, 
       //獲取當前場景,頂部場景為當前場景
	   getCurrentScene:function()
       {
		  return this.scenes[this.scenes.length-1];
	   }, 
	   //清除所有場景
	   clearAll:function()
       {
         for(var i in this.scenes)
		 {
           this.scenes[i].clean(); 
		 }
		 this.namedScenes = {};
		 this.scenes = [];
	   }
   });
}(window))