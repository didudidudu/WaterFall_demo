// 思路：取到main元素及下边的所有box元素，计算页面能容纳的列数，
// 设置main元素的宽度并居中，将第一行元素的高度放在一数组中找到最小项，将第二行元素安排在每行最小项后边达到固定效果
window.onload = function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":'1.jpg'},{"src":'3.jpg'},{"src":'6.jpg'},{"src":'12.jpg'},{"src":'18.jpg'},{"src":'19.jpg'},{"src":'7.jpg'},
					{"src":'20.jpg'}]} ;
	window.onscroll = function(){
		if(checkScroll()){
			var oParent = document.getElementById("main")
			for (var i=0;i<dataInt.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'img/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
				}
				waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText = 'width:'+ oBoxW*cols +'px;margin: 0 auto;';
	var hArr = [];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(minH,hArr);
			oBoxs[i].style.cssText = 'position:absolute;top:'+minH+'px;left:'+index*oBoxW+'px;';
			console.log(oBoxs[i].style.cssText);
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}

function getByClass(parent,classname){
	var boxArr = new Array();
	oElements=parent.getElementsByTagName('*');
	// console.log(oElements);
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == classname){
			boxArr.push(oElements[i]);
		}
	}
	// console.log(boxArr);
	return boxArr;
}

function getMinhIndex(min,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i] == min){
			return i;
		}
	}
}

function checkScroll(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var height = document.documentElement.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)? true:false;
}