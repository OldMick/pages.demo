 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �C��������
 */
(function(win){
   //������ť��
   var _sceneEventListener = win.SceneEventListener = EventListener.extend({
	   init:function(param)
	   {
		   //��ť���O�_�ͮ�
		   this.enabled = true;
		   this.onBeforeRender = param["beforeRender"]||this.onBeforeRender;
           this.onAfterRender = param["afterRender"]||this.onAfterRender;
	   },
       //������V�ާ@�eĲ�o
       onBeforeRender:function(scene){return true;},
       //������V�ާ@��Ĳ�o
       onAfterRender:function(scene){return true;}
   });
   //������   
   var _scene = win.Scene = Class.extend({
	   init:function(arg)
	   {
		  arg = arg||{};
          //�����W�� 
          this.name = arg.name||("Unnamed_"+(++_scene.SID)); 
		  //��m�H��
		  this.x = arg.x||0;
		  this.y = arg.y||0;
		  this.w = arg.w||320;
		  this.h = arg.h||200;
		  this.color = arg.color||"black";
		  //�����e��
		  this.holder = $("<div id='sc_"+this.name+"' style='position:absolute;overflow:hidden;left:0px;top:0px'></div>")
		  //�j�w��canvas����,�H�᪺���F���b�o��canvas�W�i��ø�s
		  this.cvs = $("<canvas id='cv_"+this.name+"' style='z-index:-1;position:absolute;left:0px;top:0px'></canvas>");
		  this.ctx = this.cvs[0].getContext("2d");
		  this.setPos();
		  this.setSize();
		  this.setColor(this.color);
		  this.holder.append(this.cvs);
		  $(document.body).append(this.holder);
		  //�O�s�Ҧ�����ť��
	      this.listeners = [],
		  //�O���Ҧ�����V��H
		  this.rObjs = [];
		  //�R�W����V��H�A�K��ھڦW�٧ֳt�d���H
		  this.namedRObjs = {};
	   },
	   //�Ыش�V��H
	   createRObj:function(className,arg)
       {		
		  className = className||"RenderObj"; 
          var obj =  ClassFactory.newInstance(className,arg);
		  this.addRObj(obj);
		  return obj;
	   },
       //�K�[��rObjs��
	   addRObj:function(renderObj)
       {
		  renderObj.owner = this;
		  this.rObjs.push(renderObj);
          this.namedRObjs[renderObj.name] = renderObj;
	   },
	   //�R����H
	   removeRObj:function(renderObj)
       {
		 this.removeRObjByName(renderObj.name);
	   },
       //�ھڦW�ٲ��X��H
	   removeRObjByName:function(name)
       {
          var obj = this.namedRObjs[name];
		  if(obj!=null)
		  {		  
		    delete this.namedRObjs[name];		  
		  }
		  //�q�Ʋդ����X��H
		  ArrayUtil.removeFn(this.rObjs,function(rObj){return rObj.name===name;}); 
	   },
        //�ھڦW�٬d���H
	   getRObjByName:function(name)
	   {
		   return this.namedRObjs[name];
	   },
       //�M���Ҧ���V��H
       clearRObj:function()
       {
          this.rObjs = [];
		  this.namedRObjs = {};
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
	   //��s����
	   update:function()
       {
		   for(var i = 0;i<this.rObjs.length;i++)
		   {
			   this.rObjs[i].update();
		   }
	   },     
	   //�����V	   
	   render:function()
       {
		   var ltns = this.listeners;
		   //���M�������A�A��V
           this.clear(); 
		   //�����V�e��ť��
           for(var i=0,len = ltns.length;i<len;i++)
			{
		       ltns[i].enabled&&ltns[i].onBeforeRender(this);
		    } 			
		   this.renderRObj();
		   //�����V���ť��         
		   for(var i=0;i<len;i++)
		    {
			  ltns[i].enabled&&ltns[i].onAfterRender(this);
		    }
	   },
	   //��V�Ҧ���H
	   renderRObj:function()
       {
		   for(var i = 0,len = this.rObjs.length;i<len;i++)
		   {

			   this.ctx.save();
			   this.rObjs[i].isVisible&&this.rObjs[i].render(this.ctx);
			   this.ctx.restore();
		   }
	   },
	   //�]�m��m
	   setPos:function(x,y)
	   {
		   this.x = x||this.x;
		   this.y = y||this.y;
		   this.holder.css("left",this.x).css("top",this.y);
	   },
       //�]�m�j�p
       setSize:function(w,h)
	   {
		   this.w = w||this.w;
		   this.h = h||this.h;
		   this.holder.css("width",this.w).css("height",this.h);
		   this.cvs.attr("width",this.w).attr("height",this.h);
	   },       
       //�]�mcanvas�I��
	   setColor:function(color)
	   {		   
		   this.color = color||"black";
           this.holder.css("background-color",this.color);
	   },
	   //�M��canvas�I��
	   clear:function()
       {
          this.ctx.clearRect(0,0,this.w,this.h);
	   },
       //���
	   show:function()
	   {
		   this.holder.show();
	   },
       //����
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
	   //�]�m�I��,pattern:0(�~��),1(�Ԧ�),�q�{(���Q)
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
       //�M�������Ҧ��귽
	   clean:function()
       {
		  this.listeners = null;
		  this.cvs.remove();
		  this.holder.remove();
		  this.cvs = this.holder = this.ctx = null;
	   }
   });
   //�O��scene�s��
   _scene.SID = 0;
   _scene.ClassName = "Scene";
   //���U�������u�t��
   ClassFactory.regClass(_scene.ClassName,_scene);
}(window))