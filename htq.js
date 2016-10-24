/**
 * @author  xing7th@gmail.com
 * @website http://www.showdoc.cc/htq
 */
var redis = require('redis');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json').toString());
var cp = require('child_process');

var redis_client = redis.createClient(config.redis_port,config.redis_host); //creates a new client
// redis 链接成功
redis_client.on("connect", function(error) {
	console.log("REDIS连接成功");
	//console.log(error);
	
	run_js("queue.js");
	run_js("api.js");
	
});
// redis 链接错误
redis_client.on("error", function(error) {
	console.log("REDIS连接错误:");
	console.log(error);
});





function run_js(js_name){
	child = cp.fork('./'+js_name);

	//监听子进程发送过来的message
	child.on( 'message', ( m) => {
		console.log(message);
	});

	//子进程关闭
	child.on('close',function(code,signal){
		run_js(js_name);
	});	
}



