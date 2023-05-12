 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲精靈類
 */
(function(win){
   //渲染對象類   
   var _sprite= win.Sprite = RenderObj.extend({
	   init:function(name)
	   {	       
		  this._super(name);
          //幀動畫集合對象
		  this.anims = null;
		  this.animsCtrl = new FrameCtrl();
		  //是否水平反向 
          this.isXFlip = false;
          //是否垂直反向 
		  this.isYFlip = false;
		  this.scaleX = 1;
		  this.scaleY = 1;
	   },
       //設置幀動畫集合對象
	   setAnims:function(animations,currAnimName)
	   {
		   currAnimName = currAnimName||"def";
		   this.anims = animations;
		   this.animsCtrl.setAnims(animations,currAnimName);
	   },
       //設置動畫集
       addAnim:function(name,frames,isCurrent)
	   {
		   this.anims.add(name,frames);
		   isCurrent&&this.animsCtrl.setCurrent(name);
	   },
	   //刪除指定名稱動作
	   removeAnim:function(name)
	   {
		  this.anims.remove(name);
	   },
	   //按名稱設置當前動作
       setCAnim:function(name)
	    {
           this.animsCtrl.setCurrent(name);
		},  
	   //設置動畫速度
	   setAnimSpeed:function(sp)
	   {
		   this.animsCtrl.speed = sp;
	   },
       //按名稱獲取動作
       getAnim:function(name)
	   {
		   return this.anims.get(name);
	   },       
       //獲取當前運行幀
	   getCurrFrame:function()
	   {
         return this.animsCtrl.getCurrFrame();
	   },
	   //獲取下一幀信息
	   getNextFrame:function()
	   {
		   return this.animsCtrl.getNextFrame();
	   },
       //渲染方法，每一幀調用,ctx是canvas環境
	   render:function(ctx)
       {	   	
		   ctx.translate(this.x,this.y);
		   var sw = this.scaleX*this.w;
		   var sh = this.scaleY*this.h;
		   var hw = 0.5*this.w;
		   var hh = 0.5*this.h;		
		   var scaleX = (this.isXFlip)?-this.scaleX:this.scaleX;
           var scaleY = (this.isYFlip)?-this.scaleY:this.scaleY;
		   if(this.deg!==0)
			 {
				ctx.rotate(MathUtil.deg2rad(this.deg));
			 }	
		   ctx.scale(scaleX,scaleY);
		   var f = this.getNextFrame();
		   ctx.drawImage(f[0],f[1],f[2],f[3],f[4],-hw,-hh,this.w,this.h);
	   }
   });
   _sprite.ClassName = "Sprite";
   //註冊類到類工廠中
   ClassFactory.regClass(_sprite.ClassName,_sprite);
}(window))