var timer=null;
window.onload=function(){
	// 头部拖拽层按下鼠标触发fnDown(),用于面板拖拽部分
	var top_Panel=document.getElementById('top_Panel');
	top_Panel.onmousedown=fnDown; 

	//获取按钮，以及点击按钮触发抽奖，停止抽奖，用于抽奖部分
	var	play=document.getElementById('btn_Panel').getElementsByTagName("input")[0],
		stop=document.getElementById('btn_Panel').getElementsByTagName("input")[1];
	play.onclick=playFun;	
	stop.onclick=stopFun;	
}

function fnDown(e){
	e=event||window.event;
	var wrapper=document.getElementById('wrapper'),
		disX=e.clientX-wrapper.offsetLeft;		//获取鼠标在按下时与面板左边的距离disX
		disY=e.clientY-wrapper.offsetTop;		//获取鼠标在按下时与面板上边的距离disY
	document.onmousemove=function(e){			//鼠标开始移动触发fnMove()
		e=event||window.event;
		fnMove(e,disX,disY);
	}
	document.onmouseup=function(){				//鼠标抬起
	  	document.onmousemove=null;
	  	document.onmouseup=null;
	}	
}

function fnMove(e,posX,posY) {			
	var wrapper=document.getElementById('wrapper'), 
		l=e.clientX-posX,				//计算出鼠标移动后面板距离浏览器窗口最左边的距离
		t=e.clientY-posY;				//计算出鼠标移动后面板距离浏览器窗口最上边的距离

		//设置面板可拖拽的限制范围
		if(l<0){
			l=0;
		}else if(l>document.documentElement.clientWidth-wrapper.offsetWidth){
			l=document.documentElement.clientWidth-wrapper.offsetWidth;
		}		
		if(t<0){
			t=0;
		}else if(t>document.documentElement.clientHeight-wrapper.offsetHeight){
			t=document.documentElement.clientHeight-wrapper.offsetHeight;
		}
		wrapper.style.left=l+'px';
		wrapper.style.top=t+'px';
}


function playFun(){          //开始抽奖
	var inner_img=document.getElementById('inner_img'),
		play=document.getElementById('btn_Panel').getElementsByTagName("input")[0];
	clearInterval(timer);
	timer=setInterval(function(){
          var radom=Math.floor(Math.random()*62);		//获取一个0-61的随机数字，用于替换src
          	  b='img'+'/'+radom+'.'+'jpg';	
          inner_img.src=b;
	},50);
	play.disabled=true;
	play.style.background='#ccc'
}

function stopFun(){			//停止抽奖
	var play=document.getElementById('btn_Panel').getElementsByTagName("input")[0];
	clearInterval(timer);
	play.disabled='';
	play.style.background='#FFD400'
}
