//  T.js 1.0.0
//  Editors wyt
//  time  2017/3/6

(function(win,doc){
	window.G = {};

	//关于cookie操作
	G.cookies = {
		setCookie: function(objName,objValue,objHours){
			var str = objName + "=" + escape(objValue);
			if(objHours > 0){ //为0代表不设置过期时间，浏览器关闭后cookie消失
				var date = new Date();
				var ms = objHours * 3600 * 1000;
				date.setTime(date.getTime() + ms);
				str += "; expires=" + date.toGMTString();
			}
			document.cookie = str;
		},
		getCookie: function(objName){//获取指定名称的cookie的值
			var arrStr = document.cookie.split("; ");
			for(var i=0; i<arrStr.length; i++){
				var temp = arrStr[i].split("=")
				if(temp[0] == objName){
					return unescape(temp[1]);
				}
			}
		},
		delCookie: function(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去时间
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			document.cookie = name + "=a; expires=" + date.toGMTString();
		}
	}

	//关于localStorage和sessionStorage操作
	//0代表sessionStorage，1代表localStorage
	G.storage = {
		setStorage: function(name,mark){
			if(window.localStorage){
				if(mark){
		            localStorage.setItem(name,value);
		        }else{
		            sessionStorage.setItem(name,value);
		        }
			}
		},
		getStorage: function(name,mark){
			if(window.localStorage){
		        if(mark){
		            return localStorage.getItem(name);
		        }else{
		            return sessionStorage.getItem(name);
		        }
		    }
		},
		clearStorage: function(name,mark){
			if(window.localStorage){
		        if(mark){
		            localStorage.removeItem("wzy"+name);
		        }else{
		            sessionStorage.removeItem("wzy"+name);
		        }
		    }
		}
	}

	/*关于日期操作*/
	//格式化日期
    Date.prototype.Format = function(fmt){
    	var o = {
    		"M+": this.getMonth() + 1 , //月
    		"d+": this.getDate(), //日
    		"h+": this.getHours(), //小时
    		"m+": this.getMinutes(), //分
    		"s+": this.getSeconds(), //秒
    		"q+": Math.floor((this.getMonth() + 3) /3), //季度
    		"S": this.getMilliseconds() //毫秒
    	};
    	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    	for (var k in o)
    		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	return fmt;
    }
    //返回时间差
    Date.prototype.DiffDate = function(oldTime,nowTime){
    	if(!arguments.length) return '';
    	var arg = arguments,
    		now = arg[1]? arg[1]:new Date().getTime(),
    		diffValue = now - arg[0],
    		result = '',

    		seconds = 1000,
    		minutes = 1000*60,
    		hours = 60 * minutes,
    		days = hours * 24,

    		_day = diffValue/days,
    		_hours = diffValue/hours,
    		_min = diffValue/minutes,
    		_sec = diffValue/seconds;

    		if(_day > 3) result = arg[0].Format("yyyy-MM-dd hh:mm:ss");
    		else if(_day >=1) result = parseInt(_day) + "天前";
    		else if(_hours>=1) result = parseInt(_hours) + "小时前";
    		else if(_min>=1) result = parseInt(_min) + "分钟前";
    		else result = parseInt(_sec) + "秒前";
    		return result;
    }
    
    //特殊字符过滤
    G.xssCheck  = function(str,reg){
    	return str? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,function(a,b){
	        if(b){
	            return a;
	        }else{
	            return{
	                '<':"&lt;",
	                '&':"&amp;",
	                '"':"&quot;",
	                '>':"&gt;"
	            }[a]
	        }
	    }): '';
    }

    //全屏和退出全屏
    G.fullScreen = {
    	launchFullscreen: function(element){
    		if(element.requestFullscreen) {
		        element.requestFullscreen();
		     } else if(element.mozRequestFullScreen) {
		        element.mozRequestFullScreen();
		     } else if(element.webkitRequestFullscreen) {
		        element.webkitRequestFullscreen();
		     } else if(element.msRequestFullscreen) {
		        element.msRequestFullscreen();
		     }
    	},
    	exitFullscreen: function(){
    		if(document.exitFullscreen) {
		        document.exitFullscreen();
		    } else if(document.mozCancelFullScreen) {
		        document.mozCancelFullScreen();
		    } else if(document.webkitExitFullscreen) {
		        document.webkitExitFullscreen();
		    }
    	}
    }
})(window,document)