/*
* ball�C��
*/
(function(){
	 var g = new Game();
	  //�ЫعC������
	 function initGame()
	 {
	   //��������޲z��
	   var scm = g.sceneManager; 
	   //�Ыس���
	   var sc = scm.createScene([{"w":400,"h":300}]);
	   initRenderObj(sc);
	 }
	 //�ЫعC�����F
	 function initRenderObj(sc)
	 {
	   //�H���Ы�20�Ӥp�y
	   for(var i = 0;i<20;i++)
	   {
		 var obj = sc.createRObj(Ball.ClassName);
		 //�]�m�H����m
		 obj.moveTo(MathUtil.randInt(20,380),MathUtil.randInt(20,280));
		 //�]�m�H���t��0~3
		 obj.dx = MathUtil.randInt(1,3);
		 obj.dy = MathUtil.randInt(1,3);
		 //�]�m�H���C��
		 obj.color = ColorUtil.rgb(MathUtil.randInt(255),MathUtil.randInt(255),MathUtil.randInt(255));
	   }
	 }
	 //��l�C��
	 initGame();
	 //�}�l���b
	 g.run(-1);
}())