
//  通过id获取元素
function getid(id){
    return document.getElementById(id);
}


//  获取两个数之间的随机数
function randomNum(min,max) {
    return parseInt(Math.random()*(max-min+1)+min);
}


// 生成表格函数
function createTable(_row,_col){
	// 创建一个变量用于保存table的html代码
	var html = '<table><tbody>';
	for(var i=0;i<_row;i++){   // 行
		// 拼接tr
		html += '<tr>';
		// html += '<tr style="background-color:rgb(225,255,212)">';
		for(var j=0;j<_col;j++){  // 列
			// 拼接td
			html += '<td>单元格'+ i+j +'</td>';
		}
		// 闭合tr
		html += '</tr>';
	}
	// 闭合tbody,table
	html += '</tbody></table>';
	return html;
}


//  对象转字符串的封装
function objToStr(obj){
    var str = '';
    for(var key in obj) {
    str += key + '=' + obj[key] + '&';
    }
    return str = str.slice(0,-1); 
}


//  字符串转对象的封装
function strToObj(str) {
    var obj = {};
    var arr = str.split('&');

    for(var i in arr) {
        var arr1 = arr[i].split('=');
        obj[arr1[0]] = arr1[1];
    }
    return obj;
}


//  补零操作的封装
function toDB(num) {
	if(num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}

//-----------------------------------------------------------------------------------------------------------
/*
滚轮方向判断：rollerDir(ele,callback)
	参数：
		ele  对象名
		callback  回调函数
	返回值： true 或 false

*/
function rollerDir(ele,callback){
	var istrue = true;
	ele.onmousewheel = fn; // IE 谷歌

	if(ele.addEventListener){ //火狐
		ele.addEventListener('DOMMouseScroll', fn, false);
	}

	function fn(ev){ // 判断滚轮方向
		var ev = ev || event;
		//true:向上滚了，false：向下滚了

		if(ev.wheelDelta){
			//IE 谷歌  规定：大于0 上滚； 小于0 下滚
			istrue = ev.wheelDelta > 0 ? true : false;
		}else{
			//火狐  规定：大于0 下滚； 小于0 上滚
			istrue = ev.detail < 0 ? true : false;
		}

		callback(istrue);  //回调函数 
	}

}

//--------------------------------------------------------------------------------------------------------
/*
	表单验证的方法：调用里面的子功能 （json对象里面有很多子功能）
	var checkReg = {
		tel : function() {},
		email : function() {},
		...
	}

	调用方法：
	checkReg.tel();
*/
var checkReg = {
	tel : function(str){
		var reg = /^1[3-9]\d{9}$/;
		return reg.test(str);
	},
	email : function(str){
		var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return reg.test(str);
	},
	nickname : function(str){  //昵称
		// 只能输入中文
		var reg = /^[\u4e00-\u9fa5]{0,}$/;
		return reg.test(str);
	},
	IDCard : function(str){
		// 15位 或 18位
		var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{2}[0-9xX]$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9xX]$/;
		return reg.test(str);
	},
	username : function(str){  //用户名
		//不能使用特殊字符，长度为6-20
		var reg = /^\w{6,20}$/;
		return reg.test(str);
	},
	birth : function(str){
		var reg = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/;
		return reg.test(str);
	},
	password : function(str){
		var reg = /\w{8,20}/;
		return reg.test(str);
	}

}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
	表单验证的封装：
		传入的参数为ele验证的元素，reg为正则
*/ 
function show(ele,reg){
	ele.onblur = function(){
		var dex = this.index;
		console.log(dex);
	var val = ele.value.trim();
		if(val){
			if(reg(val)){
				spans[dex].innerText = '正确';
				spans[dex].style.color = '#58bc58';
				ele.isok = true;
			}else{
				spans[dex].innerText = '不正确';
				spans[dex].style.color = 'red';
			}
		}else{
			spans[dex].innerText = '输入不能为空';
			spans[dex].style.color = 'red';
		}
	}
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
	document.cookie = name=value [;expires = date][;path = 路径][;domain = 域名]
	cookie的相关操作：var cookie = {}
	子功能：
		  存：set
		  取：get
		  删：remove
	调用: cookie.set(name, value, prop);
		  cookie.get(key);
*/
var cookie = {
	set : function(name, value, prop){
		//name 和 value 是必写参数，prop是json格式的数据
		var str = name + '=' + value;

		//prop
		//expires：设置失效时间
		if(prop.expires){
			str += ';expires=' + prop.expires.toUTCString(); //将时间转成字符串
		}
		//path：设置路径
		if(prop.path){
			str += ';path=' + prop.path;
		}
		//domain：设置访问权限
		if(prop.domain){
			str += ';domain=' + prop.domain;
		}

		//设置：存
		document.cookie = str;

	},
	get : function(key){
		//获取
		var str = document.cookie;  // name=wangyan; passw=555
		var arr = str.split('; ');  // [name=wangyan,passw=555]
		for(var i in arr){
			var arr2 = arr[i].split('=');  // [name,wangyan]
			if(key == arr2[0]){
				return arr2[1];  // 通过键名获取键值
			}
		}
	},
	remove : function(key){
		// cookie：设置时间失效，将时间设置为过去时间
		var now = new Date();
		now.setDate(now.getDate()-1); // 设置为昨天
		cookie.set(key, '', {expires : now});  // 调用了cookie中set子函数
	}
}

//--------------------------------------------------------------------------------------------------------------------
/*
	设置和获取行内样式：
	设置样式： css(节点, 'width', '50px');
	获取样式： css(节点, 'width');
	两个参数为获取行内样式；
	三个参数为设置行内样式；
*/
function css(){
	// 判断
	if(arguments.length == 2){
		// 获取样式
		return arguments[0].style[arguments[1]];
	}else if(arguments.length == 3){
		arguments[0].style[arguments[1]] = arguments[2];
	}
}

//----------------------------------------------------------------------------------------------------------------------------
/*
 	getstyle(obj,name)
 	参数： 
 	obj:对象名
 	name ：要获取的样式属性名
 	返回：样式值
*/

function getStyle(obj, name) { //用来获取样式
	if(getComputedStyle(obj, false)) {
		//主流  IE9+
		return getComputedStyle(obj, false)[name];
	} else {
		//IE8-
		return obj.currentStyle(name);
	}
}

//----------------------------------------------------------------------------------------------------------------------------
/*
	深度拷贝：deepClone()
	参数：对象（数组或json对象）
	返回值：新的对象（拷贝对象）
*/
function deepClone(obj){
	var str = JSON.stringify(obj); // 把数组或对象转成字符串
	return JSON.parse(str);  // 把字符串转换成数组对象
}

//-------------------------------------------------------------------------------------------------------------------------------
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) {
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') { //初始值
				cur = getStyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getStyle(obj, key)); //width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}

		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) {
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器

}

//----------------------------------------------------------------------------------------------------------------------------------------
/*
 	ajax(method,url,data,fn)
 	参数一：请求方式   get  和  post
 	参数二：路径
 	参数三：数据   name=malin&psw=12345
 	参数四：成功的回调    回调函数
*/

function ajax(method, url, data, fn) {
	//1.创建对象
	var xhr = new XMLHttpRequest();
	//告诉对象，要什么
	if(method == 'get' && data) {//如果是get的方式，data接在url后面
		//如果请求的地址是同一个地址，浏览器自动缓存
		url = url + '?day='+ new Date() + '&' + data ;
	}
	
	xhr.open(method,url,true);
	
	//2.发送请求
	if(method == 'get') {
		xhr.send(null);
	}else{
		//设置请求头
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	//3.3号线去后台制作
	
	//4.号线。接收数据，做渲染
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200){
				//个性需求
				if(fn) {
					fn(xhr.responseText);//实参
				}
			}else{
				alert('出错了，因为：' + xhr.status);//404找不到
			}
		}
	}
}

//--------------------------------------------------------------------------------------------
// 正三角形
function zheng(n){
	for(var i=1; i<=n; i++){
		for(var j=1; j<=i; j++){
			document.write('*');
		}
		document.write('<br/>');
	}
}

// 倒三角形
function dao(n){
	for(var i=n; i>=1; i--){
		for(var j=1; j<=i; j++){
			document.write('*');
		}
		document.write('<br/>');
	}
}

//----------------------------------------------------------------------------------------------
/*
 	毫秒转：年月日时分秒
 */
function setTimes(timer) {
	var time = new Date(timer);
	var year = time.getFullYear();//年
	var mon = toDB(time.getMonth() + 1);//0 
	var day = toDB(time.getDate());//24
	var hour = toDB(time.getHours());//时
	var min = toDB(time.getMinutes());//分
	var sec = toDB(time.getSeconds());//秒

	return {
		secs: sec,
		mins: min,
		hours: hour,
		days: day,
		mons: mon,
		years: year
	}
}



//----------------------------------------------------------------------------------------------------------------------
/*
	将数字 12345678 转成 12,345,678 (价格)格式
*/
function price(num){

	var str = String(num);   //把数字转成字符串
	var arr = str.split('').reverse();   //使用字符串方法切割(逗号隔开)变成数组，并反转
	var price = [];   // 声明一个空的数组
	// 使用for循环，每隔三位数添加一个逗号
	for(var i =0; i<arr.length; i++){
		price.push(arr[i]);
		if((i+1)%3 == 0){
			// console.log(i);
			price.push(',');
		}
	}
	return price.reverse().join('');
}
