/*
* Ball�u�y��
*/
(function(){
  //�q������RenderObj�~��
   Ball = RenderObj.extend({
   init:function(name,r)
   {
	   //�w�q�b�|
	   this.r = r||10;
	   this.color = "white";
	   this._super(name);	  
   },
   //���gupdate
   update:function()
   {
	   var w = this.owner.w,
		   h = this.owner.h;
	   //��F��ɧ��ܳt�פ�V
       if(this.x<this.r||this.x>w-this.r)
	   {
		   this.dx = -this.dx;
	   };
       if(this.y<this.r||this.y>h-this.r)
	   {
		   this.dy = -this.dy;
	   }
	   //�եΤ�����k
	   this._super();
   },
   //���grender��k
   render:function(ctx)
   {
     //�e�y��R����
	 ctx.beginPath();	 
	 ctx.fillStyle = this.color;
	 ctx.arc(this.x,this.y,this.r-3,0,Math.PI*2);
	 ctx.fill();
     ctx.lineWidth = 2;
     //�y��
	 ctx.beginPath();
	 ctx.strokeStyle ="white";
	 ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
	 ctx.stroke();
   }
  });
  Ball.ClassName = "Ball";
  //���UBall��
  ClassFactory.regClass(Ball.ClassName,Ball);
}())