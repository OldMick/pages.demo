/*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �V�ʵe��H
 */
(function(win){
 //�V�ʵe��H
   var _frames = win.Frames = Class.extend({
      init:function(name,img,duration)
	  {
         //�V�ʵe�W��
         this.name = name;
		 //�V�ʵe�C�V�ҫ��򪺮ɶ�
		 this.duration = duration|50;//�q�{�C�V����50�@��
		 //�O�s�C�V��m�A�M����ɶ��H��
		 this.frames = [];
		 //�������ʵe�V�ǦC��,
		 this.img = img;		
	  },
      //�K�[�V�ƾ�
      add:function(x,y,w,h,img,dur)
		{
		   var dur = dur||this.duration,
               img = img||this.img;			   
		   this.frames.push([img,x,y,w,h,dur]);
		},       
      //���J�V�ƾ�
      insert:function(idx,x,y,w,h,img,dur)
		{
           var dur = dur||this.duration,
			   img = img||this.img;
		   ArrayUtil.insert(this.frames,idx,[img,x,y,w,h,dur]);
		},	 
      //���X�V�ƾ�
	  remove:function(idx)
		{
		   this.frames.removeIdx(idx);
		}, 
	  //�R���Ҧ��V
	  clear:function()
	    {
           this.frames = [];
	    },
      //����V�ƾ�
	  get:function(idx)
		{
		   return this.frames[idx];
		},
      //����`��
	  getCount:function()
		{
			return this.frames.length;
		}
   });
 //�V�ʵe���X��H,�O�s�@�մV�ʵe���X
   var _animations = win.Animations = Class.extend({
     init:function()
	  {
		 //�O�s�Ҧ��ʵe�V
		 this.anims = {};
	  },
     //�K�[�V�ʵe���X
     add:function(name,frames)
	 {
		 this.anims[name] = frames;
	 },
     //�R���V�ʵe���X
     remove:function(name)
	 {
		 this.anims[name] = null;
	 },
     //�M�ŴV�ʵe���X
	 clear:function()
	 {  
		 this.anims = {};
	 },
     //�����e�V�ʵe
	 get:function(name)
	 {
		 return this.anims[name];
	 }
   })
 //�V�ʵe�����H 
  var _frameCtrl = win.FrameCtrl = Class.extend({
   	    init:function(processFrameFN)
		{
          //�ʬٰʵe�B�z���
          function defProcessFrame()
		  {
			  //�p��W�@�V��{�b���ɶ�
			  this.fDur += FrameState.elapseTime*this.speed;
			  //�p�G�W�L��e�V������ɶ��N������U�@�V
			  if(this.fDur>=this.currFrames.frames[this.currFIdx][5])
				{
				   this.fDur = 0;
				   if(this.currFIdx<this.feIdx-1)
					{		
						  ++this.currFIdx;				  		
					}
				   else
					{
					   if(this.isCycle)
						{
						  this.currFIdx = this.fsIdx;
						}	
					}         
			    }         
		  }		  
		  //�]�m�ʵe�B�z���
		  this.processFrame = processFrameFN||defProcessFrame;		 
		},	
	    //�_��Ҧ��ݩ�
		reset:function()
		{          
		  //�}�l�V����
		  this.fsIdx = 0;
		  //�����V����
		  this.feIdx = this.currFrames.getCount();
		  //��e�B��V����
		  this.currFIdx = 0;
		  //�O�_�`��
		  this.isCycle = true;
		  //��e�V�w�g���򪺮ɶ�
		  this.fDur = 0;
		  //�ʵe�t��
		  this.speed = 1;
		},		
        //�]�m��e�V�ʵe
	    setCurrent:function(name)
	    {
		  var cFrames  = this.anims.get(name);
		  if(this.currFrames!=cFrames)
			{			 
			 var oSpeed = this.speed||1;
			 this.currFrames = cFrames;
			 this.reset();
			 this.speed = oSpeed;
			}
	    },
        //�]�mframes
		setAnims:function(animations,currAnimName)
		{
          this.anims = animations; 
          currAnimName = currAnimName||"def";
		  //�]�m��e�ʵe�V��
		  this.setCurrent(currAnimName);
		},
		getCurrFrameIdx:function()
		{
		   return this.currFIdx;
		},
        //�����e�V
		getCurrFrame:function()
		{
		   return this.currFrames.get(this.currFIdx);
		},
        //����U�@�V
		getNextFrame:function()
		{
		   this.processFrame();
		   return this.currFrames.get(this.currFIdx);
		}
	})
//���W��
_frames.ClassName = "Frames";
_frameCtrl.ClassName ="FrameCtrl";
_animations.ClassName = "Animations"
//���U�������u�t��
ClassFactory.regClass(_frames.ClassName,_frames);
ClassFactory.regClass(_frameCtrl.ClassName,_frameCtrl);
ClassFactory.regClass(_animations.ClassName,_animations);
}(window))