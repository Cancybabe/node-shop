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
/*------------------商品模块------------------------*/
//查找所有商品页面请求
router.get('/findAllCommodity', function(req, res, next) {
				var sql = "select *from commodity c1 inner join commodityType c4 on c4.ctId = c1.cmdType ,(select c2.cmdId,GROUP_CONCAT(c3.laName) as labelName from commodity c1 left join lableCommodity c2 on c1.cmdId = c2.cmdId left join label c3 on 	c2.laId = c3.laId group by c1.cmdId limit 1000  ) as b where c1.cmdId = b.cmdId";
				conn.query(sql, function(err, result) {
					//console.log('result ', result);
				  for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   //console.log('string ', string);
					   var data = JSON.parse(string);
					  // console.log('data ', data);
				   }
				   res.render('admin/commodity/commoditytable',{list:result});
		});
});

//添加商品
router.get('/addCommodity', function(req, res, next) {
			var sql = "select *from commodityType";
			conn.query(sql,function(err,result){
				res.render('admin/commodity/addCommodity',{list:result});
			});
				   
	
});

//一个类型下的标签
router.get('/findTypeLabel', function(req, res, next) {
	//console.log('hehe');
			var params = req.query.id;
			console.log(params);
			var sql = "select *from label where laType ="+ params;
			conn.query(sql,function(err,result){
				console.log('result ', result);
				res.json(result);
			});
				   
	
});


//查找所有商品评论
router.get('/findAllComments', function(req, res, next) {
				var sql = "select cmId,cmContent,cmUserid,cmcmdId,cmTime,cmdName,uName from comment,commodity,user where comment.cmUserid = user.uid and comment.cmcmdId = commodity.cmdId;";
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
				   }
				   res.render('admin/commodity/commoditycomment',{list:result});
		});
});


//查找单个商品评论
router.get('/findOneCmdComment', function(req, res, next) {
				var params = req.query.id;
				var sql = "select cmId,cmContent,cmUserid,cmcmdId,cmTime,cmdName,uName from comment,commodity,user where comment.cmUserid = user.uid and comment.cmcmdId = commodity.cmdId and comment.cmcmdId = "+params+";";
				conn.query(sql, function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					   var data = JSON.parse(string);
					   console.log('data ', data);
				   }
				   res.render('admin/commodity/commoditycomment',{list:result});
		});
});


//一个商品中的某个评论
router.get('/doDeleteComment', function(req, res, next) {
						var sql = "delete from comment where cmId ="+req.query.id;
						conn.query(sql,function(err,result){
							if(err){
								console.log('[delcomment error:] 22222'+err.message);
								return;
							}else{
								   res.render('admin/info',{info:'删除成功！'});	
									
							    }
						});	
}); 

//查找单个商品的所有图片
router.get('/findPics', function(req, res, next) {
				var params = req.query.id;
				var sql = "select *from pictures where picCmdId = ?";
				conn.query(sql,params, function(err, result) {
					if(err){
						console.log('[insert comment error:]'+err.message);
						return;
					}else{
						console.log('result ', result);
						for(var i=0;i<result.length;i++){
						   var string=JSON.stringify(result[i]);
						   console.log('string ', string);
						   var data = JSON.parse(string);
						   console.log('data ', data);
					   } 
					   res.render('admin/commodity/commoditypics',{list:result});
					}
		});
});


//删除一个商品中的一个图片
router.get('/deleteCommodityPic', function(req, res, next) {
						var sql = "delete from pictures where picId ="+req.query.id;
						conn.query(sql,function(err,result){
							if(err){
								console.log('[delpictures error:] 22222'+err.message);
								return;
							}else{
								   res.render('admin/info',{info:'删除成功！'});	
									
							    }
						});	
}); 

//添加商品
router.post('/doAddCommodity', function(req, res, next) {
			var form = new formidable.IncomingForm();
			form.multiples = true;
			var filesUrl = [];
			form.uploadDir = 'public/images/'; 
			form.keepExtensions = true;
			form.hash = 'sha1';
			form.parse(req, function(err, fields, files) {
				//获取图片的url
				var fileObj = JSON.stringify(files.upload);
				console.log("files..."+fileObj);
				
				var filej = new Array();
				filej = JSON.parse(fileObj);
				console.log("files..."+filej);
				 //res.writeHead(200, {'content-type': 'text/plain'});
				  //res.end(util.inspect({fields: fields, files: files}));
				//获取当前页上的其他消息
				var fields = JSON.stringify(fields);
				var fieldsj = JSON.parse(fields);
				console.log(fieldsj);
				var cmdName = fieldsj.cmdname;
				var cmdDescribe = fieldsj.cmddes;
				var cmdPrice = fieldsj.cmdprice;
				var cmdType = fieldsj.cmdtype;
				var cmdLabel = fieldsj.oneType;
				console.log("cmdName..."+cmdName+cmdDescribe+cmdPrice+cmdType+cmdLabel);
				
				//插入商品表
				var sqlcmd = "insert into commodity (cmdName,cmdDescribe,cmdPrice,cmdType) values(?,?,?,?);";
				var params = [cmdName,cmdDescribe,cmdPrice,cmdType];
				conn.query(sqlcmd,params,function(err, resultcmd) {
					if(err){
						console.log('[insert error:]'+err.message);
						return;
					}else{
						//console.log("insertId"+resultcmd.insertId);
						//将图片URl放入图片数据库
						//console.log("filej..."+Object.keys(filej).length);//为什么加了一句这个就可以执行下面的for循环
						for(var i=0;i<filej.length;i++){
							console.log('i'+i);
							 (function(i) {
								console.log('i'+i);
								var filep = filej[i].path;
								console.log(filep);
								var fileExt = filep.substring(filep.lastIndexOf('\\')+1,filep.length);
								var filePathUrl = 'http://localhost:3000/commodity/'+fileExt;//图片的url,厉害了我的姐
								console.log(filePathUrl);
								var sqlpic = "insert into pictures (picUrl, picCmdId) values (?,?); "
								var params = [filePathUrl,resultcmd.insertId];
								conn.query(sqlpic,params,function(err,resultpic){
									if(err){
										console.log('[insert comment error:]'+err.message);
										return;
									}else{
										if(i== filej.length-1){
											res.render('admin/info',{info:'添加成功！'});
										}
									}
								});
								 })(i);
						}
					  
					  //将标签放入标签与商品的关系表中
							var sqllabel = "insert into lableCommodity (laId, cmdId) values (?,?);"
							var params = [cmdLabel,resultcmd.insertId];
							conn.query(sqllabel,params,function(err,result){
								if(err){
									console.log('[insert comment error:]'+err.message);
									return;
								}else{
									
								}
							});
					}
				});	
		});
		return;
	});
	
	
//请求单张图片http://localhost:3000/admin/upload_a3e31e957c87d6e400736bd9c78dc0a9.png	
router.get('*.png', function(req, res, next) {
   //showImg.writeImg(req, res, next);
   var imgURL = req.url;
	fs.readFile("./public/images"+imgURL, "binary", function(err, file) {
	if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err + "\n");
				res.end();
			} else {
				res.writeHead(200, {"Content-Type": "image/png"});
				res.write(file, "binary");
				res.end();
			}
		});
});
router.get('*.jpg', function(req, res, next) {
   //showImg.writeImg(req, res, next);
   var imgURL = req.url;
	fs.readFile("./public/images"+imgURL, "binary", function(err, file) {
	if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err + "\n");
				res.end();
			} else {
				res.writeHead(200, {"Content-Type": "image/png"});
				res.write(file, "binary");
				res.end();
			}
		});
});

//编辑商品
router.get('/editCommodity', function(req, res, next) {
		var results;
		conn.query('select *from commodityType',function(err,result){
			results = result;
	    });	
		var params = req.query.id;
		var sql = "select *from commodity where cmdId = ?";
				conn.query(sql,params,function(err, result) {
					//console.log('result ', result);
				  for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   //console.log('string ', string);
					   var data = JSON.parse(string);
					  // console.log('data ', data);
				   }
				   res.render('admin/commodity/editcommodity',{onecmd:result[0],list:results});
		});
});


//编辑商品
router.post('/doEditCommodity', function(req, res, next) {
			console.log('/doEditCommodity');
			var params = [req.body.cmdname,req.body.cmddes,req.body.cmdprice,req.body.cmdtype,req.body.cmdid];
			var paramsla = [req.body.oneType,req.body.cmdid];
			console.log(req.body.cmdname+req.body.cmddes+req.body.cmdprice+req.body.cmdtype+req.body.cmdid);
			var sql = "update commodity set cmdName=?,cmdDescribe=?,cmdPrice=?,cmdType=? where cmdId=?";
			conn.query(sql,params,function(err,result){
				if(err){
					console.log('[update error:]'+err.message);
					return;
				}
				//(判断影响行数)
				if(result.affectedRows>0){
					    //res.render('AdminLTE/info',{info:'编辑成功！'});
						var sqlla = "update lableCommodity set laId=? where cmdId=?";
						
						console.log(req.body.oneType+req.body.cmdid);
						conn.query(sqlla,paramsla,function(err,result){
							if(err){
								console.log('[update error:] 22222'+err.message);
								return;
							}
							//(判断影响行数)
							if(result.affectedRows>0){
								res.render('admin/info',{info:'编辑成功！'});
								
							}else{
								res.render('admin/info',{info:'编辑失败！'});
							}
						});
				}
			});
});


//删除商品
router.get('/DelCommodity', function(req, res, next) {
						var params = [req.query.id];
						var sql = "delete from commodity where cmdId ="+params;
						conn.query(sql,params,function(err,result){
							if(err){
								console.log('[cmdupdate error:] 22222'+err.message);
								return;
							}else{
									var params = [req.query.id];
									var sql = "delete from pictures where picCmdId ="+params;
									conn.query(sql,params,function(err,result){
										if(err){
											console.log('[picupdate error:] 22222'+err.message);
											return;
										}else{
												var sql = "delete from comment where cmcmdId ="+params;
												conn.query(sql,params,function(err,result){
													if(err){
														console.log('[comupdate error:] 22222'+err.message);
														return;
													}else{
														var sql = "delete from lableCommodity where cmdId ="+params;
														conn.query(sql,params,function(err,result){
															if(err){
																console.log('[lacmdupdate error:] 22222'+err.message);
																return;
															}else{
																res.render('admin/info',{info:'删除成功！'});
															}
														});	
													}
												});	
										}
									});	
							    }
						});	
});



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
				   res.render('admin/orderstable',{list:result});
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
				   res.render('admin/orderdetailstable',{list:result});
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



