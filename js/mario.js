/*
* Mario��
*/
(function(){
  //�q������Sprite�~��
     Mario = Sprite.extend({
     update:function()
	 {
	   var w = this.owner.w,
		   h = this.owner.h;
	   //��F��ɧ���x�t�פ�V
       if(this.x<20||this.x>w-20)
	   {
		   this.dx = -this.dx;
		   this.isXFlip = (this.dx<0);
	   };
	   this._super();
	 }
   })
   //���U���O�����u�t
   Mario.ClassName = "Mario";
   ClassFactory.regClass(Mario.ClassName,Mario);
}())