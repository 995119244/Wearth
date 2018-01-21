var aa="123";
console.log(aa);
let button=document.getElementsByClassName("button");
console.log(button);
window.onload=function(){
	// 当点击按钮时出现弹框
	button[0].onclick=function(){
		// alert("这是一个按钮");
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}

	var pos= document.getElementsByClassName("pos");
	pos[0].onclick= function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}

//关于城市数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(obj);
		
	}
})


$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		
		var tianqi=obj.data;
		console.log(tianqi);
		console.log(tianqi.weather.current_temperature);
		console.log(tianqi.weather.tomorrow_low_temperature);
		//var wearther=obj.data;
		//console.log(wearther);
	}
})
//关于天气信息


//**/
