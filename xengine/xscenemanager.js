 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �C�������޲z��
 */
(function(win){
   //�����޲z��   
   var _sceneman = win.SceneManager = Class.extend({
	   init:function(param)
	   {
          //�H�R�W�覡�O�s,�K��ֳt�q�L�W�����
		  this.namedScenes = {};
		  //�H��̤覡�O�s�Ҧ������A�̫᪺�������̳�
		  this.scenes = [];		  
	   },
       //�Ыطs������,�q�L���W�M�ѼƳЫ�,�]��scene�i�঳�ۤv���l��,�ݭn�`�N���Oarg�O�����n�O�ƲէΦ�
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
       //�������Ƨ�
	   sortSceneIdx:function()
	   {
		   for(var i=0,len=this.scenes.length;i<len;i++)
		   {
			   var sc = this.scenes[i];
			   sc.holder.css("z-index",i);
		   }
	   },
       //���Jscene����
       push:function(scene)
	   {
		   if(!this.getScene(scene.name))
		   {
			   this.scenes.push(scene);
			   this.namedScenes[scene.name] = scene;
			   this.sortSceneIdx();
		   }		  
	   },
       //������������
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
	   //�洫������m
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
	   //����Y�ӳ���������
	   getIdx:function(scene)
	   {		  
		   return scene.holder.css("z-index");		
	   },
	   //��Y�ӳ������ʨ�̳���
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
	   //��Y�ӳ������ʨ�̩���
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
       //�����Ჾ
       back:function(scene)
       {
		 var idx = this.getIdx(scene);
		 if(idx>0)
		 {
			 this.swap(idx,idx-1);
		 }		 
	   },
       //�����e��
       forward:function(scene)
       {
         var idx = this.getIdx(scene);
		 if(idx<this.scenes.length)
		 {			 
			 this.swap(idx,idx+1);
		 }		 
	   },
       //�ھڦW���������
	   getScene:function(name)
	   {
		 return this.namedScenes[name];
	   }, 
       //�����e����,������������e����
	   getCurrentScene:function()
       {
		  return this.scenes[this.scenes.length-1];
	   }, 
	   //�M���Ҧ�����
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