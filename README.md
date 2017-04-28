# Tjs

Useage

`<script type="javascript" src="T.js"></script>`

## **1、关于cookie的操作：**<br />
param： **objName**=>cookie的key值  **objValue**=>cookie中key的value值  **objHours**=>cookie有效时间<br />
设置cookie：`G.cookies.setCookie(objName,objValue,objHours)`<br />
获取cookie：`G.cookies.getCookie(objName,objValue,objHours)`<br />
删除cookie：`G.cookies.delCookie(objName,objValue,objHours)`<br />

## **2、关于storage的操作：**<br />
param: **name**=>storage的key值  **value**=>storage中key的value值  **mark**=>为1则存localstorage,否则sessionstorage<br />
设置storage：`G.storage.setStorage(name,value,mark)`<br />
获取storage：`G.storage.getStorage(name,mark)`<br />
删除storage：`G.storage.clearStorage(name,mark)`<br />

## **3、关于日期的操作：**<br />
日期格式化：`new Date().Format("yyyy-MM-dd hh:mm:ss")`
其中模板可以填比如("yyyy/MM/dd")

计算时间差：`new Date().DiffDate(oldtime,nowTime)`
可计算到 X秒前、X分钟前、X天前(X<=3),剩下直接就是oldtime时间
`nowTime`参数可省略,默认为当前时间

## **4、关于特殊字符过滤的操作：**<br />
param: **str**=>要过滤掉的字符串
