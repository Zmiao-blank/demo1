//缓动动画：每次移动距离越来越小
		//核心算法：（目标位置-当前位置）/10，作为每次移动距离的步长
		//停止条件：当前盒子位置=目标位置，停止定时器
		//简单动画函数封装，需要传递两个参数:obj目标对象，target目标位置
		function animate(obj,target,callback){
			//声明变量var，每次调用都会开辟一块内存出来，且变量名称都一样
			//var timer=setInterval(function(){
			//给不同元素指定不同的定时器
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				//步长值，由于步长值可能是小数，往上取整，比如8.1取9，如果步长值是负数，往下取整，比如-8.1
				var step=(target-obj.offsetLeft)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				//获得盒子的当前位置，div.offsetLeft
				if(obj.offsetLeft==target){
					//停止动画，本质上是停止定时器
					clearInterval(obj.timer);
					//回调函数写在定时器里
					if(callback){
						//调用函数
						callback();
					}
				}
				//盒子向前移动1px，将值赋给div.style.left
				obj.style.left=obj.offsetLeft+step+'px';
			},30);
		}