电视家
拉取2文件到运行环境，dsjCOOKIE.js 名字不可修改

抓取：
gaoqingdianshi.com/  随便一个链接
在请求中找 userid 和 authorization
将userid 和authorization 填入dsjCOOKIE.js 中的datas-val，格式userid&authorization

"datas": [{
      "key": "dsjheader",
      "val": "userid1&authorization1"
    }, 
    {
      "key": "dsjheader2",
      "val": "userid2&authorization2"
    }, 
    {
      "key": "dsjheader3",
      "val": "userid3&authorization3"
    }
],

如果多账号请修改
settings 中 id 为dsjCount 的 val
{
    "id": "dsjCount",
    "name": "账号个数",
    "val": "1",
    "type": "number",
    "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
}

脚本来源：https://github.com/ziye888/JavaScript
