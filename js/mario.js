/*
* Mario類
*/
(function(){
  //從引擎的Sprite繼承
     Mario = Sprite.extend({
     update:function()
	 {
	   var w = this.owner.w,
		   h = this.owner.h;
	   //到達邊界改變x速度方向
       if(this.x<20||this.x>w-20)
	   {
		   this.dx = -this.dx;
		   this.isXFlip = (this.dx<0);
	   };
	   this._super();
	 }
   })
   //註冊馬力到類工廠
   Mario.ClassName = "Mario";
   ClassFactory.regClass(Mario.ClassName,Mario);
}())