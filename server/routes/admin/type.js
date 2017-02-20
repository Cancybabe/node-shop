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
router.get('/findAllType', function(req, res, next) {
				var sql = "select *from commodityType";
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
				   res.render('admin/type/typetable',{list:result});
		});
});

//编辑标签
router.get('/addType', function(req, res, next) {
			  res.render('admin/type/addtype');
	    	
});

//编辑标签
router.post('/doAddType', function(req, res, next) {
		var params = [req.body.tyname];
			var sql = "insert into commodityType (ctName)values(?)";
			conn.query(sql,params,function(err,result){
				if(err){
					console.log('[addcommoditytype error:]'+err.message);
					return;
				}
				//(判断影响行数)
				if(result.affectedRows>0){
					res.render('admin/info',{info:'添加成功！'})
				}
			});
});

//编辑标签
router.get('/editType', function(req, res, next) {
		var params = req.query.id;
		var sql = 'select *from commodityType where ctId = ?';
		conn.query(sql,params,function(err,result){
			res.render('admin/type/edittype',{onetype:result[0]});
	    });	
		
});

//编辑商品
router.post('/doEditType', function(req, res, next) {
			var params = [req.body.tyname,req.body.tyid];
			var sql = "update commodityType set ctName=? where ctId=?";
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



