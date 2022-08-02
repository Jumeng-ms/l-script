/*
刷步数
多账号@隔开 
格式：账号-密码
==========
青龙变量
==========
export sbsAccount=''    //多账号@隔开
举个例子：export sbsAccount='13800138000-123456&13800138001-123456'
==========
*/


const request = require('request') ? require('request') :'';
const notify = require('./sendNotify') ? require('./sendNotify') : '';
const sbsAccount = process.env.sbsAccount ? process.env.sbsAccount  : '';

//var tokens = '';
//var tokenIds = '';
var msg = "";
async function main() {
    if(request == ''){
            console.log("请安装依赖：request");
            return;
        }
    let ac = sbsAccount.split('@');
    for(var i=0;i < ac.length;i++ ){
        try{
            let acArr = ac[i].split('-');
            let account = acArr[0];
            let password = acArr[1];
            try{
                let  sbs = 18000 + Math.floor(Math.random()*100+1) ;
                //console.log(sbs);
                await updateData(account,password);
            }catch(err) {
                console.length("请求有问题");
            }
        }catch(err) {
            console.length("乱填跑个锤子");
        }
    }
    if(msg.length>0){
        await notify.sendNotify("刷步数完成",msg);
    }else{
        console.log("睡觉去");
    }
}

async function updateData(account,password){
    return new Promise(resolve => {
        
        //console.log(account+":"+password);
        try {
            let  sbs = 18000 + Math.floor(Math.random()*3000+1) ;
            request({
            // 内置http请求函数
            "url": "https://api.kit9.cn/api/milletmotion/?mobile=" + account + "&password=" + password + "&step=" + sbs,//请求链接
            //"https://api.kit9.cn/api/milletmotion/?mobile=" + tel + "&password=" + pass + "&step=" + sbs
            "method": "post", //请求方法
            "json": true,
            "headers": {
                "content-type": "application/json",
            },
            "body": { "mthd": "login", "platform": "wx_mini", "userName": "" + account, "password": "" + password }
            },
            function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("用户:"+account+"刷步数成功，步数为："+sbs);    
                msg += "用户:"+account+"刷步数成功，步数为："+sbs+"\n";
            } else {
                console.log(body);
                msg += "用户名"+account+"或密码"+password+"输入错误\n";
            }
            resolve();
            })
        } catch (error) {
            console.log(error);
            resolve();
        }
    });
}
main()
