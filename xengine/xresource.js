 /*!
 * xengine
 * Copyright 2012 xiangfeng
 * Released under the MIT license
 * Please contact to xiangfenglf@163.com if you hava any question 
 * 遊戲資源類
 */
(function(win){ 
   //遊戲資源管理類
   var _resMan = win.ResManager =
	  {
	     //存儲所有定義的資源類型
	     defTypes:{},
		 //存儲所有資源
         res:{},
		 //註冊資源類型
         regResType:function(type,clz)
		 {
		   if(this.defTypes[type]==null)
		   {
		     this.defTypes[type]={"type":type,"class":clz};
		   }
		 },
         //根據類型獲取資源類 
		 getClass:function(type)
		 {
		    return this.defTypes[type]["class"];
		 },
         //加載資源 
		 load:function(type,name,src,loadedFN)
		 {
            var res = this.getClass(type).load(name,src,loadedFN);            
            this.addRes(res);
			return res;
		 },		
         //添加資源
		 addRes:function(resObj)
         {
			this.res[resObj.type]=this.res[resObj.type]||{};
			this.res[resObj.type][resObj.name]=resObj;			
		 },
         //刪除指定資源
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
		 //清除所有資源
		 clearRes:function()
		 {
            this.res = {};
		 },
         //根據名稱獲取資源
		 getResByName:function(type,name)
		 {
		    return this.res[type][name];
		 },
         //獲取幀動畫資源
         getAnimationsByName:function(fResName,fName)
	     {
		   var obj = this.res[_frameRes.ClassName][fResName];
		   var fm = obj.frames[fName];	
		   return fm;	
	     },
         //加載資源,url指定資源配置文件
		 loadRes:function(url,loadedFN,perLoadedFN)
		 {
			var self = this;
			ResUtil.loadFile(url,null,
		    function(data){
 			  self.parseRes(data,loadedFN,perLoadedFN);
			})
		 },
         //解析資源
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
   //圖片資源
   var _imgRes = win.ImageRes = {
	   //加載資源
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
   //幀動畫資源
   var _frameRes = win.FrameRes = {	   
	   load:function(name,url,loadedFN)
	   {
		   //解析frameJSON格式配置文件
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
					  //如果忽略則取全部
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
		   //加載幀動畫資源
		   ResUtil.loadFile(url,null,function(data){
			   obj.isLoaded = true;
               for(var i in data)
			   {
				   if(data.hasOwnProperty(i))
				   {					  
					   var f = data[i];					
					   obj.frames[i] = new Animations();
					   //解析幀動畫資源
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
   //註冊資源類到資源管理器中
   _resMan.regResType(_imgRes.ClassName,_imgRes);
   _resMan.regResType(_frameRes.ClassName,_frameRes);
}(window))