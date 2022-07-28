// [rule: login]
/*
* 短信登录
*/
let appid = "959";
let client_ver = "1.0.0";
let sdk_ver = "1.0.0";
let qversion = "1.0.0";
let country_code = "86";
let mobile = "";
let md5Salt1 = "sb2cwlYyaCSN1KUv5RHG3tmqxfEb8NKN";
let md5Salt2 = "4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj";
let gsalt = "";
let cookie = "";
let code = "";
start();
function start() {
	sendText("欢迎使用登录，按q/Q退出，注意：会显示ck哦！！！");
	sendText("请输入手机号:");
	mobile = input();
	if(mobile == "q" || mobile == "Q"){
		sendText("已退出")
		return;
	}else{
		getParam();
	}
	
}

function getParam() {
	let cmd = 36;
	let sub_cmd = 1;
	let ts = new Date().getTime();
	let gsign = MD5Encrypt(`${appid}${qversion}${ts}${cmd}${sub_cmd}${md5Salt1}`);
	let url = `https://qapplogin.m.jd.com/cgi-bin/qapp/quick`;
	let body = `client_ver=${client_ver}&gsign=${gsign}&appid=${appid}&return_page=https%3A%2F%2Fcrpl.jd.com%2Fn%2Fmine%3FpartnerId%3DWBTF0KYY%26ADTAG%3Dkyy_mrqd%26token%3D&cmd=${cmd}&sdk_ver=${sdk_ver}&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
	let urlObject = populateJdUrlObject(url, "", body, "post");
	let result = request(urlObject);
	result = JSON.parse(result);
	if (!result) {
		sendText("凉凉");
		return;
	}
	if (result.err_code == 0) {
		console.log(`获取参数成功`);
		gsalt = result.data.gsalt;
		cookie = `guid=${result.data.guid}; lsid=${result.data.lsid}; gsalt=${result.data.gsalt}; rsa_modulus=${result.data.rsa_modulus};`;
		sendSms();
	} else {
		console.log(`获取参数失败：${result.err_msg}`);
		sendText(`获取参数失败：${result.err_msg}`);
		return;
	}
}

function sendSms() {
	let cmd = 36;
	let sub_cmd = 2;
	let ts = new Date().getTime();
	let gsign = MD5Encrypt(`${appid}${qversion}${ts}${cmd}${sub_cmd}${gsalt}`);
	let sign = MD5Encrypt(
		`${appid}${qversion}${country_code}${mobile}${md5Salt2}`
	);
	let url = `https://qapplogin.m.jd.com/cgi-bin/qapp/quick`;
	let body = `country_code=${country_code}&client_ver=${client_ver}&gsign=${gsign}&appid=${appid}&mobile=${mobile}&sign=${sign}&cmd=${cmd}&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
	let urlObject = populateJdUrlObject(url, cookie, body, "post");
	let result = request(urlObject);
	result = JSON.parse(result);
	if (!result) {
		sendText("凉凉");
		return;
	}
	console.log("sendmsg", result);
	if (result.err_code == 0) {
		console.log(
			`验证码已发送到${mobile}，有效期：${result.data.expire_time}秒`
		);
		sendText(`验证码已发送到${mobile}，有效期：${result.data.expire_time}秒`);
		sendText("请输入验证码:");
		code = input();
		if(code == "q" || code =="Q"){
			sendText("已退出")
			return;
		}else{
			verifyCode(code);
		}	
	} else {
		sendText(`发送验证码失败，请尝试重新运行：${result.err_msg}`);
		return;
	}
}
function verifyCode(smscode) {
	let cmd = 36;
	let sub_cmd = 3;
	let ts = new Date().getTime();
	let gsign = MD5Encrypt(`${appid}${qversion}${ts}${cmd}${sub_cmd}${gsalt}`);
	let sign = MD5Encrypt(
		`${appid}${qversion}${country_code}${mobile}${md5Salt2}`
	);
	let url = `https://qapplogin.m.jd.com/cgi-bin/qapp/quick`;
	let body = `country_code=${country_code}&client_ver=${client_ver}&gsign=${gsign}&smscode=${smscode}&appid=${appid}&mobile=${mobile}&sign=${sign}&cmd=${cmd}&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
	let urlObject = populateJdUrlObject(url, cookie, body, "post");
	let result = request(urlObject);
	result = JSON.parse(result);
	if (!result) {
		sendText("凉凉");
		return;
	}
	if (result.err_code == 0) {
		sendText(`pt_key=${result.data.pt_key}; pt_pin=${result.data.pt_pin};`);
	} else {
		sendText(`京东登录失败，请尝试重新运行：${result.err_msg}`);
	}
}
function populateJdUrlObject(url, ck, body = "", method) {
	let host = url.replace("//", "/").split("/")[1];
	let urlObject = {
		url: url,
		method: method,
		headers: {
			Host: host,
			cookie: ck,
			"User-Agent":
				'Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({"packageName":"com.vivo.hybrid","type":"deeplink","extra":{}})',
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
			"Accept-Encoding": "*/*",
		},
	};
	if (body) {
		urlObject.headers["Content-Type"] =
			"application/x-www-form-urlencoded; charset=utf-8";
		urlObject.headers["Content-Length"] = body.length;
		urlObject.body = body;
	}
	return urlObject;
}

function safeGet(data) {
	try {
		if (typeof JSON.parse(data) == "object") {
			return true;
		} else {
			console.log(data);
		}
	} catch (e) {
		console.log(e);
		console.log(`服务器访问数据为空，请检查自身设备网络情况`);
		return false;
	}
}


// prettier-ignore
function MD5Encrypt(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}
