 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �C����V��H��
 */
(function(win){
   //��V��H��   
   var _renderObj = win.RenderObj = Class.extend({
	   init:function(name)
	   {	
	     this.name = name||("Unnamed_"+(_renderObj.SID++));
		 //�֦���,���V������H
		 this.owner = null;
		 //x,y��V����
		 this.x = 0;
		 this.y = 0;
		 //��H�e�שM����
		 this.w = 0;
		 this.h = 0;	
		 //x,y��V���t��
		 this.dx = 0;
		 this.dy = 0;
		 //x,y��V���[�t��
		 this.vx = 0;
		 this.vy = 0;
		 //����
		 this.deg = 0;
		 //z-index
		 this.zIdx = 0;
		 //�O�_�i��
		 this.isVisible = true;
	   },	        	   
	   //�]�m��m
	   moveTo:function(x,y)
       {
		   this.x = x||this.x;
		   this.y = y||this.y;
	   },    
	   //����
	   move:function(xOff,yOff)
	   {
		   this.x += xOff;
		   this.y +=yOff;
	   },
	   //���ʤ@�p�B
	   moveStep:function()
       {
          this.dx += this.vx;
		  this.dy += this.vy;
		  this.x += this.dx;
		  this.y += this.dy;
	   },
       //����deg��
       rot:function(deg)
       {
		  this.deg = deg;
	   }, 
	   //��s��k�A�C�@�V�ե�	   
	   update:function()
       {
          this.moveStep();
	   },
       //��V��k�A�C�@�V�ե�,ctx�Ocanvas����
	   render:function(ctx)
       {
          return;
	   }
   });
   //�O��renderObj�s��
   _renderObj.SID = 0;
   _renderObj.ClassName = "RenderObj";
   //���U�������u�t��
   ClassFactory.regClass(_renderObj.ClassName,_renderObj);
}(window))