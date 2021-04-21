//轮播图播放效果
//1.当鼠标经过focus时，左右按钮显示；不经过则消失 
window.addEventListener('load',function(){ 
var arrow_l=document.querySelector('.arrow-l');
var arrow_r=document.querySelector('.arrow-r');
var focus=document.querySelector('.focus');
focus.addEventListener('mouseenter',function(){
	arrow_l.style.display='block';
	arrow_r.style.display='block';
	clearInterval(timer);
	timer=null;//释放变量null内存
});
focus.addEventListener('mouseleave',function(){
	arrow_l.style.display='none';
	arrow_r.style.display='none';
	timer=setInterval(function(){
		arrow_r.click();
	},2000);
});
//2.动态生成小圆圈，根据图片个数自动生成小圆圈个数
var ul=focus.querySelector('ul');
var ol=focus.querySelector('.circle');
var focusWidth=focus.offsetWidth;
//确定ul中的li个数
//console.log(ul.children.length);
for(var i=0;i<ul.children.length;i++){
	//创建li
	var li=document.createElement('li');
	//记录当前小圆圈的索引号，通过自定义属性来做
	li.setAttribute('index',i);
	//把创建的li个数插入到ol中，父亲appendCild孩子
	ol.appendChild(li);
	//3.小圆圈的样式，排他思想，在生成小圆圈的同时直接绑定点击事件
	li.addEventListener('click',function(){
		for(var j=0;j<ol.children.length;j++){
			ol.children[j].className='';
		}
		this.className='current';
		//4.点击小圆圈，移动图片，是ul，移动距离是li的索引号*图片宽度
		//animate(obj,target,callback)
		//点击某个li,就拿到当前li的索引号
		var index=this.getAttribute('index');
		
		// 当我们点击了某个小li 就要把这个li 的索引号给 num和circle
		num=index;
		circle=index;
		console.log(focusWidth);
		console.log(index);
		animate(ul,-index*focusWidth);
	})
}
//把ol中的第一个li设置current样式
ol.children[0].className='current';
//5.克隆第一张图片，放到ul的最后面
var first=ul.children[0].cloneNode(true);
ul.appendChild(first);
//6.点击右侧按钮，图片滚动一张
var num=0;
var circle=0;
arrow_r.addEventListener('click',function(){
	if(num==ul.children.length-1){
		ul.style.left=0;
		num=0;
	}
	num++;
	animate(ul,-num*focusWidth);
//7.点击右侧按钮，小圆圈跟随一起变化，在声明一个变量circle控制小圆圈的播放
	circle++;
	//如果circle==4,说明走到我们最后克隆的那张照片了
	if(circle==ol.children.length){
		circle=0;
	}
	circleChange();
});
//左侧按钮功能
arrow_l.addEventListener('click',function(){
	if(num==0){
		ul.style.left=-(ul.children.length-1)*focusWidth+'px';
		num=ul.children.length-1;
	}
	num--;
	animate(ul,-num*focusWidth);
//7.点击右侧按钮，小圆圈跟随一起变化，在声明一个变量circle控制小圆圈的播放
	circle--;
	//如果circle==4,说明走到我们最后克隆的那张照片了
	if(circle<0){
		circle=ol.children.length-1;
	}
	circleChange();
});

function circleChange(){
	for(var i=0;i<ol.children.length;i++){
		ol.children[i].className='';
	}
	ol.children[circle].className='current';
}
//8.自动播放轮播图，类似于点击右侧按钮，手动调用点击事件arrow_r.click()
var timer=setInterval(function(){
	arrow_r.click();
},3000);
})