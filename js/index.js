//引入远程数据

var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		 city=obj.data;
		 console.log(city);
	}
})

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})


//页面加载函数
window.onload=function(){
	update();

	//页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	pos.onclick=function(){
		cityBox.style.display="block";
	}
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;
			AJAX(chengshi);
		}
	}
	//搜索部分
	 var searchBox = document.getElementsByClassName("searchBox")[0];
	 var button=document.getElementsByClassName("button")[0];
	 var text;
     searchBox.onfocus=function(){
   	 	button.innerHTML="确认";
     	text=searchBox.value;
   }
    button.onclick=function(){
   	var neirong=button.innerHTML;
   	if(neirong=="取消"){
   		var city3=document.getElementsByClassName("city");
   		city3.style.display="none";
   	}else{
   		for(let i in city){
   			for(let j in city[i]){
   				if(text==j){
   					AJAX(text);
   					return;
   				}else{
   					alert("无此城市天气信息");
   					return;
   				     }
   			   }
   		}
   	}
  }
}

//获取点击城市的信息
function  AJAX(str){
    $.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();		
        var city2=$(".city")[0];
        city2.style.display="none";     
    }
})
}
//获取数据函数
function update(){
	var pos=document.getElementsByClassName("pos")[0];
	//console.log(pos);
	pos.innerHTML=tianqi.city;

	var quality_level=document.getElementsByTagName("h5")[0];
	//console.log(quality_level);
	quality_level.innerHTML=tianqi.weather.quality_level;

	//当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	//console.log(current_temperature);
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	//当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	//console.log(current_condition);
	current_condition.innerHTML=tianqi.weather.current_condition;
    //当前风向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;
	 //当前风等级
	var wind_level1=document.getElementsByClassName("wind_level")[0];
	wind_level1.innerHTML=tianqi.weather.wind_level+"级";


	//今天天气情况图标
    var today_icon=document.getElementsByClassName("conPic")[0];
    today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

    var c=document.getElementsByClassName("c")[0];
    c.innerHTML=tianqi.weather.current_condition;

    var c1=document.getElementsByClassName("c1")[0];
    c1.innerHTML=tianqi.weather.tomorrow_condition;

    //明天天气图标
    var tomorrow_icon=document.getElementsByClassName("tomorrw_icon")[0];
    tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

    //var tem=document.getElementsByClassName("tem")[0];
    var tmax=document.getElementsByClassName("tmax")[0];
    tmax.innerHTML=tianqi.weather.high_temperature+"°";

     var tmin=document.getElementsByClassName("tmin")[0];
     tmin.innerHTML=tianqi.weather.low_temperature+"°/";

     var h1 =document.getElementsByClassName("h1")[0];
     h1.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";

     var l1=document.getElementsByClassName("l1")[0];
     l1.innerHTML=tianqi.weather.tomorrow_low_temperature+"°/";




    //每小时的天气情况
    
    var hourlArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlArr){
    	//创建box
    	var box1=document.createElement("div");
   		box1.className="box";
  		//创建time块
   		var time=document.createElement("div");
    	time.className="time";
    	box1.appendChild(time);
    	time.innerHTML=hourlArr[i].hour+":00";
    	//创建图标块
    	var icon=document.createElement("div");
    	icon.className="icon";
    	box1.appendChild(icon);
    	//修改样式
    	icon.style=`background-image:url("img/${hourlArr[i].weather_icon_id}.png")`;
    	//创建温度块
    	var timeTem=document.createElement("div");
    	timeTem.className="timeTem";
   		box1.appendChild(timeTem);
   		timeTem.innerHTML=hourlArr[i].temperature+"°";
   		//生成
   		wrap.appendChild(box1);

    }

        var dayarr=tianqi.weather.forecast_list;
        var wrap1=document.getElementsByClassName("wrap1")[0];
   for(let i in dayarr){
        var box2=document.createElement("div");
     	box2.className="box";

     	var date=document.createElement("div");
     	date.className="date";
     	box2.appendChild(date);
     	date.innerHTML=dayarr[i].date;

        var condition=document.createElement("div");
        condition.className="condition";
        box2.appendChild(condition);
        condition.innerHTML=dayarr[i].condition

     	
   		var icon=document.createElement("div");
    	icon.className="icon";
    	box2.appendChild(icon);
    	icon.style=`background-image:url("img/${dayarr[i].weather_icon_id}.png")`;

    	var max=document.createElement("div");
    	max.className="max";
    	box2.appendChild(max);
    	max.innerHTML=dayarr[i].high_temperature+"°";

    	var min=document.createElement("div");
    	min.className="min";
    	box2.appendChild(min);
    	min.innerHTML=dayarr[i].low_temperature+"°";

    	var wind=document.createElement("div");
    	wind.className="wind";
    	box2.appendChild(wind);
    	wind.innerHTML=dayarr[i].wind_direction;



    	var wind_level=document.createElement("div");
    	wind_level.className="wind_level";
    	box2.appendChild(wind_level);
    	wind_level.innerHTML=dayarr[i].wind_level;
 		
 		wrap1.appendChild(box2);

   }
 //获取城市信息
   var city1=document.getElementsByClassName("city")[0];
   for(let i in city) {
   		var citys=document.createElement("div");
   		citys.className="citys";

   		var title=document.createElement("div");
   		title.className="title";
   		title.innerHTML=i;
   		citys.appendChild(title);

   		var con=document.createElement("div");
   		con.className="con";

   		for(let j in city[i]){
   		var box=document.createElement("div");
   		box.className="box";
   		box.innerHTML=j;
   		con.appendChild(box);
   		}
   		citys.appendChild(con);
   		city1.appendChild(citys);
   }
}


