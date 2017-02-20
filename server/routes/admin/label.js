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
router.get('/findAllLabel', function(req, res, next) {
				var sql = "select laId,laName,laType,ctName from label,commodityType where label.laType = commodityType.ctId";
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
				   res.render('admin/label/labeltable',{list:result});
		});
});

//编辑标签
router.get('/addLabel', function(req, res, next) {
		var results;
		conn.query('select *from commodityType',function(err,result){
			results = result;
			  res.render('admin/label/addlabel',{list:results});
	    });	
});

//编辑标签
router.post('/doAddLabel', function(req, res, next) {
		var params = [req.body.laname,req.body.latype];
			var sql = "insert into label (laName,laType)values(?,?)";
			conn.query(sql,params,function(err,result){
				if(err){
					console.log('[addlabel error:]'+err.message);
					return;
				}
				//(判断影响行数)
				if(result.affectedRows>0){
					res.render('admin/info',{info:'添加成功！'})
				}
			});
});

//编辑标签
router.get('/editLabel', function(req, res, next) {
		var results;
		conn.query('select *from commodityType',function(err,result){
			results = result;
	    });	
		//var params = req.query.id;
		var sql = "select *from label where laId = "+ req.query.id;
				conn.query(sql,function(err, result) {
					console.log('result ', result);
					   var string=JSON.stringify(result);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
				  
				   res.render('admin/label/editlabel',{onela:result[0],list:results});
		});
});

//编辑商品
router.post('/doEditLabel', function(req, res, next) {
			var params = [req.body.laname,req.body.latype,req.body.laid];
			var sql = "update label set laName=?,laType=? where laId=?";
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

		


module.exports = router;



