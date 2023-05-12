/*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 幀動畫對象
 */
(function(win){
 //幀動畫對象
   var _frames = win.Frames = Class.extend({
      init:function(name,img,duration)
	  {
         //幀動畫名稱
         this.name = name;
		 //幀動畫每幀所持續的時間
		 this.duration = duration|50;//默認每幀持續50毫秒
		 //保存每幀位置，和持續時間信息
		 this.frames = [];
		 //對應的動畫幀序列圖,
		 this.img = img;		
	  },
      //添加幀數據
      add:function(x,y,w,h,img,dur)
		{
		   var dur = dur||this.duration,
               img = img||this.img;			   
		   this.frames.push([img,x,y,w,h,dur]);
		},       
      //插入幀數據
      insert:function(idx,x,y,w,h,img,dur)
		{
           var dur = dur||this.duration,
			   img = img||this.img;
		   ArrayUtil.insert(this.frames,idx,[img,x,y,w,h,dur]);
		},	 
      //移出幀數據
	  remove:function(idx)
		{
		   this.frames.removeIdx(idx);
		}, 
	  //刪除所有幀
	  clear:function()
	    {
           this.frames = [];
	    },
      //獲取幀數據
	  get:function(idx)
		{
		   return this.frames[idx];
		},
      //獲取總數
	  getCount:function()
		{
			return this.frames.length;
		}
   });
 //幀動畫集合對象,保存一組幀動畫集合
   var _animations = win.Animations = Class.extend({
     init:function()
	  {
		 //保存所有動畫幀
		 this.anims = {};
	  },
     //添加幀動畫集合
     add:function(name,frames)
	 {
		 this.anims[name] = frames;
	 },
     //刪除幀動畫集合
     remove:function(name)
	 {
		 this.anims[name] = null;
	 },
     //清空幀動畫集合
	 clear:function()
	 {  
		 this.anims = {};
	 },
     //獲取當前幀動畫
	 get:function(name)
	 {
		 return this.anims[name];
	 }
   })
 //幀動畫控制對象 
  var _frameCtrl = win.FrameCtrl = Class.extend({
   	    init:function(processFrameFN)
		{
          //缺省動畫處理函數
          function defProcessFrame()
		  {
			  //計算上一幀到現在的時間
			  this.fDur += FrameState.elapseTime*this.speed;
			  //如果超過當前幀的持續時間就切換到下一幀
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
		  //設置動畫處理函數
		  this.processFrame = processFrameFN||defProcessFrame;		 
		},	
	    //復位所有屬性
		reset:function()
		{          
		  //開始幀索引
		  this.fsIdx = 0;
		  //結束幀索引
		  this.feIdx = this.currFrames.getCount();
		  //當前運行幀索引
		  this.currFIdx = 0;
		  //是否循環
		  this.isCycle = true;
		  //當前幀已經持續的時間
		  this.fDur = 0;
		  //動畫速度
		  this.speed = 1;
		},		
        //設置當前幀動畫
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
        //設置frames
		setAnims:function(animations,currAnimName)
		{
          this.anims = animations; 
          currAnimName = currAnimName||"def";
		  //設置當前動畫幀集
		  this.setCurrent(currAnimName);
		},
		getCurrFrameIdx:function()
		{
		   return this.currFIdx;
		},
        //獲取當前幀
		getCurrFrame:function()
		{
		   return this.currFrames.get(this.currFIdx);
		},
        //獲取下一幀
		getNextFrame:function()
		{
		   this.processFrame();
		   return this.currFrames.get(this.currFIdx);
		}
	})
//類名稱
_frames.ClassName = "Frames";
_frameCtrl.ClassName ="FrameCtrl";
_animations.ClassName = "Animations"
//註冊類到類工廠中
ClassFactory.regClass(_frames.ClassName,_frames);
ClassFactory.regClass(_frameCtrl.ClassName,_frameCtrl);
ClassFactory.regClass(_animations.ClassName,_animations);
}(window))