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

	//关于日期
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
    	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    	for(var k in 0)
    		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	return fmt;
    }
})(window,document)