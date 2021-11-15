module.exports = {
    "id": "dsj",
    "name": "电视家APP",
    "keys": ["dsjheader", "dsjtx", "dsjheader2", "dsjtx2", "dsjheader3", "dsjtx3", "dsjheader4", "dsjtx4", "dsjheader5", "dsjtx5", "dsjheader6", "dsjtx6", "dsjheader7", "dsjtx7", "dsjheader8", "dsjtx8", "dsjheader9", "dsjtx9", "dsjheader10", "dsjtx10", "dsjheader11", "dsjtx11", "dsjheader12", "dsjtx12", "dsjheader13", "dsjtx13", "dsjheader14", "dsjtx14", "dsjheader15", "dsjtx15", "dsjheader16", "dsjtx16", "dsjheader17", "dsjtx17", "dsjheader18", "dsjtx18", "dsjheader19", "dsjtx19", "dsjheader20", "dsjtx20"],
	"author": "@ziye",
	"settings": [{
			"id": "dsjSuffix",
			"name": "当前账号",
			"val": "1",
			"type": "number",
			"desc": "当前抓取ck记录的账号序号，如：1、2、3、"
		},
		{
			"id": "dsjCount",
			"name": "账号个数",
			"val": "1",
			"type": "number",
			"desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
		},
		{
			"id": "dsjXH",
			"name": "循环获取CK",
			"val": "0",
			"type": "number",
			"desc": "0关闭 1开启,默认关闭"
		},
		{
			"id": "dsjZDTX",
			"name": "自动提现",
			"val": "0",
			"type": "number",
			"desc": "可设置0,1,5,10,20,25,30,50,99  0不提现 1随机提现 99由上到下所有提现 其他固定提现"
		},
		{
			"id": "dsjXYZ",
			"name": "执行概率",
			"val": "100",
			"type": "number",
			"desc": "0不执行 可设置0-100,默认百分百"
		},
		{
			"id": "dsjTXTX",
			"name": "余额提醒",
			"val": "0",
			"type": "number",
			"desc": "0不提醒 可设置0,5,10,20,25,30,50,100"
		},
		{
			"id": "dsjnotifyttt",
			"name": "推送控制",
			"val": "1",
			"type": "number",
			"desc": "0关闭，1推送,默认12点以及23点推送"
		},
		{
			"id": "dsjnotifyInterval",
			"name": "通知控制",
			"val": "2",
			"type": "number",
			"desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知 "
		},
		{
			"id": "dsjMinutes",
			"name": "推送-通知 分钟控制",
			"val": "10",
			"type": "number",
			"desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
		}
	],
	"repo": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.js",
	"icons": ["https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.png", "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.png"],
	"script": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.js",
	"datas": [{
	  "key": "dsjheader",
	  "val": ""
	}, 
	{
	  "key": "dsjheader2",
	  "val": ""
	}, 
	{
	  "key": "dsjheader3",
	  "val": ""
	}
	],
	"sessions": [],
	"isLoaded": true
}
  
