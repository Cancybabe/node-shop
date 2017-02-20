var express = require('express');
var async = require("async");
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var fs = require('fs');  //node.js核心的文件处理模块
var router = express.Router();

var mysql = require("mysql");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
	port:3306,
    database:'shoppingmall'
});

conn.connected;

/*------------------登录模块------------------------*/
//登录页面请求
router.get('/login', function(req, res, next) {
  res.render("admin/login");
});

//判断能否登录成功
router.post('/doLogin', function(req, res, next) {
		//判断登录的用户名和密码是否正确，如果正确则写cookie信息，不正确则提示用户名或密码错误
			var sql = "select *from admin";
			var params = req.body.username;
			conn.query("select *from admin where adAdminname = ?",params,function(err,result){
				if(err){
					console.log("err"+err);
					return;
				}
				 str = JSON.stringify(result);
				 var obj = JSON.parse(str);
				 var password = obj[0].adPassword;
				 if(password == req.body.userpassword){
						//写cookie信息
						res.cookie('adminuser', 'zhangsan', { maxAge: 3600000, httpOnly: true });
						res.redirect("/commodity/findAllCommodity");     
				 }
		});
});

//退出登录
router.get('/doLoginOut', function(req, res, next) {
	  //清除指定cookie信息
  res.clearCookie('adminuser', { path: '/' });
  res.render("admin/login");  
});


module.exports = router;



