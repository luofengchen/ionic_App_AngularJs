var express = require('express');
var http = require('http');
var reqhttp = require("request")
var querystring = require('querystring');
// import 'aes.js'
var Obj = require('./run.js')
//var bodyParser = require("body-parser");
var app = express();
var shuju = '';
var wrong = null;

// var dir = "/v1"
//app.use(bodyParser.json({limit: '1mb'}));
//app.use(bodyParser.urlencoded({extended: true}));
var host = 'www.music.163.com';
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var cookie=null
var user={}
function createWebAPIRequest(path,method,data,resp) {
		var postData = data
		var options = {
		  hostname: 'music.163.com',
		  port: 80,
		  path: path,
		  method: method,
		  headers: {
		  	'Referer': 'http://music.163.com',
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Connection': 'keep-alive',
		    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
		    // 'Content-Length': Buffer.byteLength(postData)
		  }
		};
		var req = http.request(options, (res) => {
		  res.setEncoding('utf8');
		  shuju = ''
		  res.on('data', (chunk) => {
		    console.log(`响应主体: ${chunk}`);
		    	shuju += chunk
		  })
		  res.on('end', () => {
		    console.log('响应中已无数据。');
		   	   // return
			   // if (cb) {
			   		resp.send(shuju)
			    // }
		  })
		})
		req.on('error', (e) => {
		  console.error(`请求遇到问题: ${e.message}`);
	    		wrong = e.message
	    		resp.send(wrong)
		});

		// 写入数据到请求主体
		req.write(postData);
		req.end();
}
// app.post('/search', (req,res)=> {
// 	res.header("Access-Control-Allow-Origin","*")
// 	// console.log(req.query.data)
// 	// console.log(req.query)
// 	// console.log(req.body)
// 	var data = req.query;
// 	// data = JSON.stringify(data)
// 	console.log(data.params)
// 	console.log('--------------------------------')
// 	console.log(data.encSecKey)
// 	data = "params=" + encodeURIComponent(data.params) + "&encSecKey=" + data.encSecKey;
// 	console.log(data)
// 	// http://music.163.com/weapi/search/suggest/web?csrf_token= 
// 	// search接口 API
// 	createWebAPIRequest("/weapi/search/suggest/web?csrf_token=",'POST',data,res,function (d) {
// 		res.send(d);
// 	})
// });


app.get('/search', (req,res,next)=> {
	res.header("Access-Control-Allow-Origin","*")
	var data = req.query
	console.log(data)
	var search = data.search
	var path = data.path
	createWebAPIRequest(path,'POST',search,res)
});
app.get('/detail',(req,res)=>{
	res.header("Access-Control-Allow-Origin","*");
	var data = req.query;
	console.log(data)
	var detail = data.detail
	var path = data.path
	createWebAPIRequest(path,'POST',detail,res)
})

app.get('/player',(req,res)=>{
	res.header("Access-Control-Allow-Origin","*");
	var data = req.query;
	console.log(data)
	var player = data.player
	var path = data.path
	createWebAPIRequest(path,'POST',player,res)
})





var server = app.listen(4001, function() {
	console.log("启动App http://localhost:4001");
});

