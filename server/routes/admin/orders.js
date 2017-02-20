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
/*-----------------------订单模块---------------------------------*/
//查找所有订单页面请求
router.get('/findAllOrders', function(req, res, next) {
				var sql = "select *from orders c1 inner join user c4 on c4.uId = c1.orUserId,(select c2.orId,GROUP_CONCAT(c3.cmdName) as cmdName from orders c1 left join orderCommodity c2 on c1.orId = c2.orId left join commodity c3 on 	c2.cmdId = c3.cmdId group by c1.orId limit 1000  ) as b where c1.orId= b.orId;";
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
				   }
				   res.render('admin/order/orderstable',{list:result});
		});
});

//订单详情
router.get('/doOrderDetails', function(req, res, next) {
				var params = req.query.id;
				var sql = "select  *from (select cmdId from orderCommodity where orId = "+params+") as a ,commodity where a.cmdId = commodity.cmdId;";
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
				   }
				   res.render('admin/order/orderdetailstable',{list:result});
		});
});	

//删除订单
router.get('/delOrder', function(req, res, next) {
						var params = [req.query.id];
						var sql = "delete from orders where orId ="+params;
						conn.query(sql,params,function(err,result){
							if(err){
								console.log('[ordel error:] 22222'+err.message);
								return;
							}else{
									var sql = "delete from orderCommodity where orId ="+params;
									conn.query(sql,params,function(err,result){
										if(err){
											console.log('[orcmddel error:] 22222'+err.message);
											return;
										}else{
											res.render('admin/info',{info:'删除成功！'});	
										}
									});	
							    }
						});	
}); 			


module.exports = router;



