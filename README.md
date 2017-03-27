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
