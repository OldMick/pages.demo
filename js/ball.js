/*
* Ball彈球類
*/
(function(){
  //從引擎的RenderObj繼承
   Ball = RenderObj.extend({
   init:function(name,r)
   {
	   //定義半徑
	   this.r = r||10;
	   this.color = "white";
	   this._super(name);	  
   },
   //重寫update
   update:function()
   {
	   var w = this.owner.w,
		   h = this.owner.h;
	   //到達邊界改變速度方向
       if(this.x<this.r||this.x>w-this.r)
	   {
		   this.dx = -this.dx;
	   };
       if(this.y<this.r||this.y>h-this.r)
	   {
		   this.dy = -this.dy;
	   }
	   //調用父類方法
	   this._super();
   },
   //重寫render方法
   render:function(ctx)
   {
     //畫球填充中心
	 ctx.beginPath();	 
	 ctx.fillStyle = this.color;
	 ctx.arc(this.x,this.y,this.r-3,0,Math.PI*2);
	 ctx.fill();
     ctx.lineWidth = 2;
     //描邊
	 ctx.beginPath();
	 ctx.strokeStyle ="white";
	 ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
	 ctx.stroke();
   }
  });
  Ball.ClassName = "Ball";
  //註冊Ball類
  ClassFactory.regClass(Ball.ClassName,Ball);
}())