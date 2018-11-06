/* 工具箱 */
let dateOperate = {
  /**
   * 按照指定格式格式化日期
   * @param {any} time 时间戳-毫秒级
   * @param {any} fmt 格式化模板
   * @returns time
   */
  formatDate (time, fmt) {
    let o = {
      'M+': time.getMonth() + 1, // 月
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt
  },
  /**
   * 比较日期返回几天前
   * @param {any} oldTime 要比较的时间
   * @param {any} nowTime 当前时间(可选,不传默认为当前时间)
   * @returns time
   */
  diffDate (oldTime, nowTime) {
    if (!arguments.length) return ''
    let arg = arguments
    let now = arg[1] ? arg[1] : new Date().getTime()
    let diffValue = now - arg[0]
    let result = ''
    let seconds = 1000
    let minutes = 1000 * 60
    let hours = 60 * minutes
    let days = hours * 24
    let _day = diffValue / days
    let _hours = diffValue / hours
    let _min = diffValue / minutes
    let _sec = diffValue / seconds

    if (_day > 3) result = dateOperate.formatDate(new Date(arg[0]), 'yyyy-MM-dd hh:mm:ss')
    else if (_day >= 1) result = parseInt(_day) + '天前'
    else if (_hours >= 1) result = parseInt(_hours) + '小时前'
    else if (_min >= 1) result = parseInt(_min) + '分钟前'
    else result = parseInt(_sec) + '秒前'
    return result
  }
}

let formatOperate = {
  /**
   * 格式化mac
   * @param {any} mac 要格式化的mac
   * @returns 
   */
  formatMac(mac) {
    let str = ''
    let lastIndex = 0
    for (let i = 0; i < 6; i++) {
      if (i == 5) {
        str += mac.substr(lastIndex, 2)
      } else {
        str += mac.substr(lastIndex, 2) + ':'
      }
      lastIndex += 2
    }
    return str
  }
}

let storageOperate = {
  /**
   * 设置存储
   * @param {any} name 名字
   * @param {any} value 值
   * @param {any} mark 标记 1为localstorage 0为sessionStorage
   */
  setStorage(name, value, mark) {
    if (mark) {
      localStorage.setItem(name, value)
    } else {
      sessionStorage.setItem(name, value)
    }
  },
  /**
   * 获取本地存储
   * @param {any} name 名字
   * @param {any} mark 标记 1为localstorage 0为sessionStorage
   * @returns 
   */
  getStorage(name, mark) {
    if (mark) {
      return localStorage.getItem(name)
    } else {
      return sessionStorage.getItem(name)
    }
  },
  /**
   * 删除本地存储
   * @param {any} name 名字
   * @param {any} mark 标记 1为localstorage 0为sessionStorage
   */
  delStorage(name, mark) {
    if (mark) {
      localStorage.removeItem(name)
    } else {
      sessionStorage.removeItem(name)
    }
  }
}

let objectOperate = {
  /**
   * 判断是否为空对象
   * @param {any} o 要判断的对象值
   * @returns Boolean
   */
  isEmptyObject (o) {
    return Object.keys(o).length === 0
  },
  /**
   * 优雅的链式取值方式
   * @param {any} obj 对象的值
   * @param {any} props 要取的值
   * @param {any} def 默认值
   * @returns string
   */
  _get (obj, props, def) {
    if ((obj === null) || obj === null || typeof props !== 'string') return def
    const temp = props.split('.')
    const fieldArr = [].concat(temp)
    temp.forEach((e, i) => {
      if (/^(\w+)\[(\w+)\]$/.test(e)) {
        const matchs = e.match(/^(\w+)\[(\w+)\]$/)
        const field1 = matchs[1]
        const field2 = matchs[2]
        const index = fieldArr.indexOf(e)
        fieldArr.splice(index, 1, field1, field2)
      }
    })
    return fieldArr.reduce((pre, cur) => {
      const target = pre[cur] || def

      if (target instanceof Array) {
        return [].concat(target)
      }
      if (target instanceof Object) {
        return Object.assign({}, target)
      }
      return target
    }, obj)
  }
}

let filter = {
  /**
   * 过滤html里面的特殊字符
   * @param {any} str 要过滤的字符串
   * @param {any} reg 表达式
   * @returns str
   */
  htmlEscape (str, reg) {
    return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
      if (b) {
        return a
      } else {
        return {
          '<': '&lt;',
          '&': '&amp;',
          '"': '&quot;',
          '>': '&gt;',
          '\'': '&#39'
        }[a]
      }
    }) : ''
  }
}

/**
 * 字节转换
 * @param {any} limit 字节大小
 * @returns 转换后的
 */
function conver (limit) {
  let size = ''
  if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B'
  } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
  } else { // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  let sizestr = size + ''
  let len = sizestr.indexOf('.')
  let dec = sizestr.substr(len + 1, 2)
  if (dec === '00') { // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

export {
  dateOperate,
  formatOperate,
  storageOperate,
  objectOperate,
  filter,
  conver
}