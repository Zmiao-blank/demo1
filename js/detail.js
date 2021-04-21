//在页面加载完成后再执行JS
window.addEventListener('load',function(){
	var preview_img=document.querySelector('.preview_img');
	var mask=document.querySelector('.mask');
	var big=document.querySelector('.big');
	//1.当鼠标经过preview_img，就显示和隐藏  遮挡层mask和大盒子big
	preview_img.addEventListener('mousemove',function(){
		mask.style.display='block';
		big.style.display='block';
	})
	preview_img.addEventListener('mouseout',function(){
		mask.style.display='none';
		big.style.display='none';
	})
	//2.鼠标移动的时候，让黄色的盒子跟着鼠标走
	//获得鼠标在父盒子preview_img内的坐标，将它给遮挡层mask
	preview_img.addEventListener('mousemove',function(e){
		//鼠标在页面上的距离减去盒子（注意父盒子有没有定位，如果有则是preview_img到父盒子的距离）到页面的距离，得出鼠标在盒子内的坐标
		var x=e.pageX-this.offsetLeft;
		var y=e.pageY-this.offsetTop;
		//console.log(x,y);
		//把上面得到的坐标给遮挡层mask
		var maskX=x - mask.offsetWidth/2;
		var maskY=y -mask.offsetHeight/2;
		//遮挡层的最大移动距离
		var maskMax=preview_img.offsetWidth - mask.offsetWidth;
		if(maskX<=0){
			maskX=0;
		}else if(maskX>=maskMax){
			maskX=maskMax;
		}
		if(maskY<=0){
			maskY=0;
		}else if(maskY>=maskMax){
			maskY=maskMax;
		}
		mask.style.left= maskX+ 'px';
		mask.style.top= maskY+ 'px';
		
		//移动黄色遮挡层，大图片跟随移动功能，通过比例计算求得
		//遮挡层移动距离/遮挡层最大移动距离=大图片移动距离/大图片最大移动距离
		
		//遮挡层的最大移动距离
		//var maskMax=preview_img.offsetWidth - mask.offsetWidth;
		//大图片最大移动距离
		var bigIMg=document.querySelector('.bigIMg');
		var bigMax=bigIMg.offsetWidth-big.offsetWidth;
		//算得大图片的移动距离X Y
		var bigX=maskX*bigMax/maskMax;
		var bigY=maskY*bigMax/maskMax;
		//图片必须设置定位，才能有top值和left值
		bigIMg.style.left= -bigX + 'px';
		bigIMg.style.top= -bigY + 'px';
})