/*
* ball遊戲
*/
(function(){
	 var g = new Game();
	  //創建遊戲場景
	 function initGame()
	 {
	   //獲取場景管理器
	   var scm = g.sceneManager; 
	   //創建場景
	   var sc = scm.createScene([{"w":400,"h":300}]);
	   initRenderObj(sc);
	 }
	 //創建遊戲精靈
	 function initRenderObj(sc)
	 {
	   //隨機創建20個小球
	   for(var i = 0;i<20;i++)
	   {
		 var obj = sc.createRObj(Ball.ClassName);
		 //設置隨機位置
		 obj.moveTo(MathUtil.randInt(20,380),MathUtil.randInt(20,280));
		 //設置隨機速度0~3
		 obj.dx = MathUtil.randInt(1,3);
		 obj.dy = MathUtil.randInt(1,3);
		 //設置隨機顏色
		 obj.color = ColorUtil.rgb(MathUtil.randInt(255),MathUtil.randInt(255),MathUtil.randInt(255));
	   }
	 }
	 //初始遊戲
	 initGame();
	 //開始飛奔
	 g.run(-1);
}())