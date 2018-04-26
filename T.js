/* 工具箱 */
let dateOperate = {
	/**
	 * 按照指定格式格式化日期
	 * 
	 * @param {any} time 时间戳-毫秒级
	 * @param {any} fmt 格式化模板
	 * @returns 
	 */
	formatDate(time, fmt) {
		let o = {
			"M+": time.getMonth() + 1, // 月
			"d+": time.getDate(), // 日
			"h+": time.getHours(), // 小时
			"m+": time.getMinutes(), // 分
			"s+": time.getSeconds(), // 秒
			"q+": Math.floor((time.getMonth() + 3) / 3), // 季度
			"S": time.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * 比较日期返回几天前
	 * 
	 * @param {any} oldTime 要比较的时间
	 * @param {any} nowTime 当前时间(可选,不传默认为当前时间)
	 * @returns 
	 */
	diffDate(oldTime, nowTime) {
		if (!arguments.length) return '';
		var arg = arguments,
			now = arg[1] ? arg[1] : new Date().getTime(),
			diffValue = now - arg[0],
			result = '',

			seconds = 1000,
			minutes = 1000 * 60,
			hours = 60 * minutes,
			days = hours * 24,

			_day = diffValue / days,
			_hours = diffValue / hours,
			_min = diffValue / minutes,
			_sec = diffValue / seconds;

		if (_day > 3) result = dateOperate.formatDate(new Date(arg[0]), "yyyy-MM-dd hh:mm:ss");
		else if (_day >= 1) result = parseInt(_day) + "天前";
		else if (_hours >= 1) result = parseInt(_hours) + "小时前";
		else if (_min >= 1) result = parseInt(_min) + "分钟前";
		else result = parseInt(_sec) + "秒前";
		return result;
	}
}

let formatOperate = {
	/**
	 * 格式化mac
	 * 
	 * @param {any} mac 要格式化的mac
	 * @returns 
	 */
	formatMac(mac) {
		let str = "";
		let lastIndex = 0;
		for (let i = 0; i < 6; i++) {
			if (i == 5) {
				str += mac.substr(lastIndex, 2);
			} else {
				str += mac.substr(lastIndex, 2) + ":";
			};
			lastIndex += 2;
		}
		return str;
	}
}

export {
	dateOperate,
	formatOperate
}