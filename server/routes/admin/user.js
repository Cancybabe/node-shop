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
/*-----------------------标签模块---------------------------------*/
//查找所有订单页面请求
router.get('/findAllUser', function(req, res, next) {
				var sql = "select *from user";
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);
				   }
				   res.render('admin/user/usertable',{list:result});
		});
});


//编辑用户请求
router.get('/editOneUser', function(req, res, next) {
				var sql = "select *from user where uid="+req.query.id;
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);
				   }
				   res.render('admin/user/edituser',{oneuser:result[0]});
		});
});

//执行编辑用户请求
router.post('/doEditUser', function(req, res, next) {
			var params = [req.body.uname,req.body.upwd,req.body.unickname,req.body.uid];
			var sql = "update user set uName=? ,uPwd = ?,uNickname=? where uid=?";
			conn.query(sql,params,function(err,result){
				if(err){
					console.log('[update error:]'+err.message);
					return;
				}
				//(判断影响行数)
				if(result.affectedRows>0){
					res.render('admin/info',{info:'编辑成功！'})
				}
			});
});


//查找一个用户下的收货地址
router.get('/findOneAddress', function(req, res, next) {
				var params = req.query.id;
				var sql = "select *from userAddress where uid="+params;
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);
				   }
				   res.render('admin/user/addresstable',{list:result});
		});
});


//删除一个用户下的一个收货地址
router.get('/delAddress', function(req, res, next) {
						var sql = "delete from userAddress where adrId ="+req.query.id;
						conn.query(sql,function(err,result){
							if(err){
								console.log('[ordel error:] 22222'+err.message);
								return;
							}else{
							    res.render('admin/info',{info:'删除成功！'});	
							}
						});	
});	

//删除一个用户以及收货地址
router.get('/delUser', function(req, res, next) {
						var sql = "delete from user where uid ="+req.query.id;
						conn.query(sql,function(err,result){
							if(err){
								console.log('[user error:] 22222'+err.message);
								return;
							}else{
									var sql = "delete from userAddress where uid ="+req.query.id;
									conn.query(sql,function(err,result){
										if(err){
											console.log('[address error:] 22222'+err.message);
											return;
										}else{
											res.render('admin/info',{info:'删除成功！'});	
										}
									});	
							}
						});	
});


module.exports = router;



