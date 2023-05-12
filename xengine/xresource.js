 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * �C���귽��
 */
(function(win){ 
   //�C���귽�޲z��
   var _resMan = win.ResManager =
	  {
	     //�s�x�Ҧ��w�q���귽����
	     defTypes:{},
		 //�s�x�Ҧ��귽
         res:{},
		 //���U�귽����
         regResType:function(type,clz)
		 {
		   if(this.defTypes[type]==null)
		   {
		     this.defTypes[type]={"type":type,"class":clz};
		   }
		 },
         //�ھ���������귽�� 
		 getClass:function(type)
		 {
		    return this.defTypes[type]["class"];
		 },
         //�[���귽 
		 load:function(type,name,src,loadedFN)
		 {
            var res = this.getClass(type).load(name,src,loadedFN);            
            this.addRes(res);
			return res;
		 },		
         //�K�[�귽
		 addRes:function(resObj)
         {
			this.res[resObj.type]=this.res[resObj.type]||{};
			this.res[resObj.type][resObj.name]=resObj;			
		 },
         //�R�����w�귽
		 removeRes:function(resObj)
		 {
            var t = resObj.type,
				n = resObj.name;
		    delete this.res[t][n];
			if(JSONUtil.isEmpty(this.res[t]))
			 {
				delete this.res[t];
			 }
		 },
		 //�M���Ҧ��귽
		 clearRes:function()
		 {
            this.res = {};
		 },
         //�ھڦW������귽
		 getResByName:function(type,name)
		 {
		    return this.res[type][name];
		 },
         //����V�ʵe�귽
         getAnimationsByName:function(fResName,fName)
	     {
		   var obj = this.res[_frameRes.ClassName][fResName];
		   var fm = obj.frames[fName];	
		   return fm;	
	     },
         //�[���귽,url���w�귽�t�m���
		 loadRes:function(url,loadedFN,perLoadedFN)
		 {
			var self = this;
			ResUtil.loadFile(url,null,
		    function(data){
 			  self.parseRes(data,loadedFN,perLoadedFN);
			})
		 },
         //�ѪR�귽
         parseRes:function(res,loadedFN,perLoadedFN)
         {	     
			 var resCount = 0;
			 var totalCount = 0;
			 var resType=[];
			 this.res=[];
			 for(i in res){ 
				 if(res.hasOwnProperty(i))
			     {
				   resType.push(i);totalCount+=res[i].length;
				 }
			 }	
			 var cResTIdx=0;
			 var cRes=resType[cResTIdx];
			 var cResCount=0; 
			 var loadObj = null;
			 var self = this;
			 var loadHand=window.setInterval(function(){
			   if(loadObj==null)
			   {
			     loadObj = self.load(cRes,res[cRes][cResCount].name,res[cRes][cResCount].src);
			   }
			   else
			   {
			     if(loadObj.isLoaded)
				 {
                     resCount++;
					 cResCount++;
					 perLoadedFN&&perLoadedFN(totalCount,resCount);
                     if(resCount==totalCount)
					 {
                       window.clearInterval(loadHand);
                       loadedFN&&loadedFN(loadedFN);
					   return ;
					 }
                     if(cResCount>=res[cRes].length)
					 {
					    cResTIdx++;
					    cRes=resType[cResTIdx];
                        cResCount=0; 
					 }
                     loadObj = self.load(cRes,res[cRes][cResCount].name,res[cRes][cResCount].src);
				 }
			   }			
		     });
	     }
	  }    
   //�Ϥ��귽
   var _imgRes = win.ImageRes = {
	   //�[���귽
	   load:function(name,url,loadedFN)
	   {
           var img = new Image();
		   img.src=url;	
		   var obj = {"type":"image","name":name,"hEle":img,"src":url,"isLoaded":false};
           img.onload=function()
		   {
		      obj.isLoaded = true;
			  loadedFN&&loadedFN();
 		   }
           return  obj;
	   }
   };
   //�V�ʵe�귽
   var _frameRes = win.FrameRes = {	   
	   load:function(name,url,loadedFN)
	   {
		   //�ѪRframeJSON�榡�t�m���
	      function parse(animations,data)
	      {
			  switch(data.type)
			   {
				  case 0:
					  var res = _resMan.getResByName(_imgRes.ClassName,data.img);
					  var fs = new Frames("def",res.hEle);
					  fs.add(0,0,res.hEle.width,res.hEle.height);
					  animations.add("def",fs);
					  break;
				  case 1:
					  var res = _resMan.getResByName(_imgRes.ClassName,data.img);
					  if(res===null)
					   {
						  console.log("Load image for frames:"+data.img+" error !")
						  return;
					   }
					  var r = data.rc[0];
					  var c = data.rc[1];
					  var w = data.rc[2];
					  var h = data.rc[3];
					  var fs = data.animations;
					  //�p�G�����h������
					  if(fs==null)
					  {		
						  var fs = new Frames("def",res.hEle);
						  for(var i = 0;i<r;i++)
						  {
							 for(var j = 0;j<c;j++)
							  {
								fs.add(j*w,i*h,w,h);		
							  }
						  }    
						  animations.add("def",fs);
					  }
					  else
					  {
						  for(var fname in fs)
						   {
							  if(fs.hasOwnProperty(fname))
							   {
								   var fss = fs[fname];
								   var fm = new Frames(fname,res.hEle);
								   for(var j = fss[0];j<=fss[fss.length-1];j++)
									{							
										var fx = j%c;
										fx|=fx;
										var fy = j/c;
										fy|=fy;
										fm.add(w*fx,h*fy,w,h);							
									}
								   animations.add(fname,fm);
							   }
						   }		
					  }				 	
					  break;			 
			   }
	      }
		   var obj = {"type":"frame","name":name,"src":url,"frames":{},"isLoaded":false};
		   //�[���V�ʵe�귽
		   ResUtil.loadFile(url,null,function(data){
			   obj.isLoaded = true;
               for(var i in data)
			   {
				   if(data.hasOwnProperty(i))
				   {					  
					   var f = data[i];					
					   obj.frames[i] = new Animations();
					   //�ѪR�V�ʵe�귽
                       parse(obj.frames[i],f);
				   }
			   }
			   loadedFN&&loadedFN();
           });
           return  obj;
	   }
   }
   _imgRes.ClassName = "image";
   _frameRes.ClassName = "frame";
   //���U�귽����귽�޲z����
   _resMan.regResType(_imgRes.ClassName,_imgRes);
   _resMan.regResType(_frameRes.ClassName,_frameRes);
}(window))