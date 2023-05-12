 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �C���D��ج[��
 */
(function(win){
   //²�檺�{�Ǩƥ��ť��
   var _appEventListener = win.AppEventListener = EventListener.extend({
	   init:function(param)
	   {
		   //��ť���O�_�ͮ�
		   this.enabled = true;
		   this.onBeforeRender = param["beforeRender"]||this.onBeforeRender;		   
           this.onAfterRender = param["afterRender"]||this.onAfterRender;
	   },
       //�C���D�`�������V�ާ@�eĲ�o
       onBeforeRender:function(){return true;},
       //�C���D�`�������V�ާ@��Ĳ�o
       onAfterRender:function(){return true;}
   });

   var _game = win.Game = Class.extend({
     //�O�s�Ҧ�����ť��
	 listeners:[],
	 //�����޲z��
	 sceneManager:null,
     //��l�Ƥ�k
	 init:function()
	 {	   
	   this.sceneManager = new SceneManager();
	   this.paused = false;
	 },
     //�K�[��ť��
	 addListener:function(ln)
     {
       this.listeners.push(ln);
	 },
     //�M�ź�ť���C��
     clearListener:function()
     {
	   this.listeners.length = 0;
     },
     //�C���D�`��
     mainloop:function()
	 {
	  //����C���D�`��
      var ltns = this.listeners;
	  //Ĳ�o��ť����V�e�ƥ�
	  for(var i=0,len = ltns.length;i<len;i++)
		{
		  ltns[i].enabled&&ltns[i].onBeforeRender();
		} 
	  //�����e�����A��s�A�ô�V
      var scene = this.sceneManager.getCurrentScene();
	  if(scene)
	  {
	    scene.update();
	    scene.render();
	  }
      //Ĳ�o��ť����V��ƥ�	  
	  for(var i=0;i<len;i++)
	   {
		  ltns[i].enabled&&ltns[i].onAfterRender();
	   }
	 },
	 //����C��
	 run:function(fps)
	 {     
	   //�]�wfps�q�{��60�V/�� 
	   fps = fps||60;
       var self = this,
	       spf = (1000/fps)|0;
	   //�}�ҴV�Ƹ���
	   FrameState.start();
       self.tHand = setInterval(function(){         
          //��s�V���A
          FrameState.update();	
		  if(!self.paused)
		   {
			  self.mainloop();
		   }
	   },spf); 
	 },
     //�Ȱ��C��
	 pause:function()
	 {
		 this.paused = true;
	 },
	 //�פ�C��
	 stop:function()
	 {
	   clearInterval(this.tHand);
	 }
   });
}(window))