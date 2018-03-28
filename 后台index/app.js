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
		var postd = data
		// var postd = "params=p%2B5Frg2GBoI0iByWGAwjbajiDMAwRBgAoEM%2BsNIsB3ynImlJGPRYSBEOSSUkLjnE47v9IQNP364%2BJlUWBpVDyAr6Jnkv1CUShdnZmXwdjHAPEkEHkOEApEgbTZI%2F9hhWW8CXw45gE5RM2CQKspaPQOHYgXjWFvlf%2BEVKuXX5z52GLLs3RrB7y411367pV7vjxKXFw9bI8UPxjXosfDTUq1j9QsA3W6z0v88pE16uEWV%2BByjbx5H6xLrSQNY9kfK%2BfdjW9AQqGfoDzwkk1xlAzqts61nHYcK1tkWB1R3v4afZ4URnMKecn3Mjvbnenyph&encSecKey=397cc8352ae7b9f1811af86afd3e9652cb6a5912b6722015f6836576403f4c055e969b69d859cfe61f6eadc3c76fcc13e1285d909b457d79a0afd81a44baa45ab5d7a80044223f3195acffe2d5e76a543ffadf18615ff5a23bbd32933118a4d1992c78812787723b5f381db7def32fbf66466526e5469dde2f025bc47f07562b"; 这种方法可以成功输出
		console.log(postd)
		var options = {
		  hostname: 'music.163.com',
		  port: 80,
		  path: path,
		  method: method,
		  headers: {
		  	// 'Referer': 'http://music.163.com',
		    'Content-Type': 'application/x-www-form-urlencoded',
		    // 'Connection': 'keep-alive',
		    // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
		    'Content-Length': Buffer.byteLength(postd)
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
		req.write(postd);
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
	var search = data.shuju
	var path = data.path
	// var path = "/weapi/cloudsearch/get/web";
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

