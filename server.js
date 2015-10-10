//-----------------------------------------------
// how to run this js & result
//C:\JJChen_SW\node.js\node.js_code>node post3.js
//STATUS: 204
//HEADERS: {"server":"WebServer V1.0"}
//204 No Content (success)
//-----------------------------------------------

//var http = require("http");  //work!
var http = require('http');  //work!
var querystring = require('querystring');

var postData = querystring.stringify({
  //$.post("http://192.168.1.122/control.html",{"__SL_P_ULD":"LED1:OFF\0"})
  //'__SL_P_ULD' : 'LED1:OFF\0'
  '__SL_P_ULD' : 'LED1:HALF\0'
  //'__SL_P_ULD' : 'LED1:FULL\0'
  
  //$.post("app.html", {"__SL_P_USR":"\0"})
  //'__SL_P_USR' : '\0'	//sys reset
});

var options = {
  host: '192.168.1.122',
  //hostname: 'Redspider.ddns.net',		//No hostname for every embedded server
  port: 80,
  path: '/control',
  //path: '/app',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();
