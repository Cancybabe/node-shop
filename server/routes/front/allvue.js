var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mysql = require("mysql");
var jwt = require('jsonwebtoken');
var async = require("async");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
	port:3306,
    database:'shoppingmall'
});

conn.connected;

/*
	相应用户登录请求
*/
router.post('/login', function(req, res, next) {
	console.log('front/login访问到了');
  	//查询
		var data = req.body;
		// console.log(data);
	    var pwd = data.password;
		// console.log(pwd);
		var account = data.account;
		// console.log(account);
		conn.query("select *from user where uName = ?",account,function(err,result){
				if(err){
					console.log("查询用户表"+err);
					return;
				}
				 str = JSON.stringify(result);
				  // console.log('服务器str'+str);
				 var obj = JSON.parse(str);
				 // console.log('服务器obj'+obj);
				 var password = obj[0].uPwd;
				  var uid = obj[0].uid;
				 // console.log('服务器password'+password);
				 if(password == pwd){
				 	console.log('登录成功');
				 	  // 创建token
				 //用用户名和密码的对象生成token
				 var token = jwt.sign({uid:uid}, 'app.get(superSecret)', {
					expiresIn: 86400 // expires in 24 hours
				 });
			        console.log('token'+token);
				 	//把token存进数据库
				 	var params = [token,account];
				 	conn.query("update user set token = ? where uName = ?",params,function(err,result){
				 		   if(err){
								console.log("插入用户表"+err);
								return;
							}
							 res.json({
					            success: true,
					            message: 'Enjoy your token!',
					            token: token
			               });
				 	});
				 }
		});
});

// 因为是单页应用 所有请求都走/dist/index.html
router.get('/', function(req, res, next) {
	console.log('hhee');
  	const html = fs.readFileSync(path.resolve(__dirname, '../../../dist/index.html'), 'utf-8');
    res.send(html);
});

/** 
 *
 *搜索操作
 *
 * 
 */
router.post('/doSearch', function(req, res, next) {
	console.log('front/doSearch访问到了');
	var params=req.body.product_info;
  	var sql ="select *from commodity where  cmdName like '%"+params+"%'";
	 conn.query(sql,function(err, result) {
			      	if (err) {
			      		console.log("数据查询错误");
			      	};
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					  
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);

				   }
				   res.json({list:result});
		});
  		
});

/**
 *
 *响应列表信息展示
 * 
 */

router.post('/productlist', function(req, res, next) {
	console.log('front/productlist访问到了');
	var params=req.body.laId;
  	var sql ="select *from lableCommodity,commodity where lableCommodity.cmdId = commodity.cmdId and laId =?";
			      conn.query(sql, params,function(err, result) {
			      	if (err) {
			      		console.log("数据查询错误2");
			      	};
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					  
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);

				   }
				   res.json({list:result});
		});
  		
});
/** 
商品详情

 */
router.post('/productDetail', function(req, res, next) {
	console.log('front/productDetail访问到了');
	var params=req.body.cmdId;
  	var sql ="select *from commodity where cmdId =?";
		 conn.query(sql, params,function(err, result) {
			        conn.query("select cmId,cmContent,cmUserid,cmcmdId,cmTime,cmdName,uName from comment,commodity,user where commodity.cmdId=comment.cmcmdId and comment.cmUserid = user.uid and comment.cmcmdId = ?",params,
			      			function(err,result1){

			      			if (err) {
			      				console.log("数据查询错误3");

			      			};
					   	    res.json({product:result,comment:result1});
					   });
			      		   
		});
  		
});

/** 
 * 获取收货地址
 */
router.post('/address', function(req, res, next) {
	console.log('front/address访问到了');
	var params=req.body.uid;
  	var sql = "select *from useraddress where uid=?";
				conn.query(sql, params,function(err, result) {
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					  
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   var type = data.laType;
					   console.log('type ', type);

				   }
				   res.json({list:result});
		});
  		
});

// /*
// 	首页类型展示	
//  */
// router.get('/allTypes', function(req, res, next) {
// 	console.log("进入/front/allTypes");
//   	var sql = "select ctName from commodityType";
// 				conn.query(sql, function(err, result) {
// 					// console.log('result ', result);
// 					for(var i=0;i<result.length;i++){
// 					   var string=JSON.stringify(result[i]);
// 					  // console.log('string ', string);
// 					   var data = JSON.parse(string);
// 					  // console.log('data ', data);
// 					   var type = data.laType;
// 					  // console.log('type ', type);

// 				   }
// 				   res.json({list:result});
// 		});
  		
// });

/*
	首页信息展示	
 */
router.post('/', function(req, res, next) {
  	var sql = "select laId,laName,laType,ctName from label,commodityType where label.laType = commodityType.ctId";
				conn.query(sql, function(err, result) {
					// console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					  // console.log('string ', string);
					   var data = JSON.parse(string);
					  // console.log('data ', data);
					   var type = data.laType;
					  // console.log('type ', type);

				   }
				   res.json({list:result});
		});
  		
});

//某类型的商品列表
router.post('/typeCommodityList', function(req, res, next) {
	console.log("进入/front/typeCommodityList");
	var params = req.body.cmdType;
	console.log("cmdType"+params);
  	var sql = "select *from commodity,commodityType  where commodity.cmdType = commodityType.ctId and commodityType.ctName = ?";
				conn.query(sql, params ,function(err, result) {
					console.log('result', result);
					for(var i=0;i<result.length;i++){
						   var string=JSON.stringify(result[i]);
						   console.log('string', string);
						   var data = JSON.parse(string);
						   console.log('data', data);
						   var cmdId = data.cmdId;
						   console.log('cmdId', cmdId);

						   //查询图片url
					}
					res.json({list:result});
		});
  		
});


//某类型的商品列表图片
router.post('/getTypeCmdPics', function(req, res, next) {
	console.log("进入/front/getTypeCmdPics");
	var params = req.body.cmdId;
	console.log("cmdId"+params);
  	var sql = "select picUrl from pictures where picCmdId = "+params;
				conn.query(sql,function(err,result){
						if(err){
									console.log('图片表查询有误');

								}else{
											console.log('result'+result);
											var string=JSON.stringify(result[0]);
											var data = JSON.parse(string);
											 console.log('data ', data);
											var picurl2 = data.picUrl;
											console.log('picurl2 ', picurl2);
											res.json({list:result[0]});
							}
													
			});
  		
});


/*
	相应用户登录请求
*/
router.post('/login', function(req, res, next) {
	console.log('front/login访问到了');
  	//查询
		var data = req.body;
		console.log(data);
		// var msg = JSON.stringify(data[0]);
		// console.log("msg"+msg);
		// var obj = JSON.parse(msg);
	    var pwd = data.password;
		console.log(pwd);
		var account = data.account;
		console.log(account);
		
		conn.query("select *from admin where adAdminname = ?",account,function(err,result){
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
/*-----------------------个人中心---------------------------------*/
router.post('/my', function(req, res, next) {
	console.log('front/my访问到了');
  	//查询
	
		var params=req.body.uid;
		conn.query("select *from user where uid = ?",params,function(err,result){
				if(err){
					console.log("err"+err);
					return;
				}
				 str = JSON.stringify(result);
				 var obj = JSON.parse(str);
				 res.json({list:result});
				
		});

});
/*-----------------------购物车模块--------------------------------*/
router.post('/addToCar',function(req,res,next){
		console.log("进入到front/addToCar");
		var params=req.body.cmdid;
		//var params=req.body.cmdid;
		console.log("添加到购物车获得商品id"+params);
		conn.query("insert into shopcar (cmdId) values (?)",params,function(err,result){
				if(err){
					console.log("err"+err);
					return;
				}else{
					console.log("成功添加进数据库");
				}
		});


});


//查找购物车内的商品
router.get('/allshopcar', function(req, res, next) {
	console.log('front/allshopcar');
  	var sql ="select *from commodity,shopcar where  commodity.cmdId = shopcar.cmdId";
	 conn.query(sql,function(err, result) {
			      	if (err) {
			      		console.log("数据查询错误");
			      	};
					console.log('result ', result);
					for(var i=0;i<result.length;i++){
					   var string=JSON.stringify(result[i]);
					   console.log('string ', string);
					  
					   var data = JSON.parse(string);
					   console.log('data ', data);
					   // var type = data.laType;
					   // console.log('type ', type);

				   }
				   console.log("购物车返回数据给前台");
				   res.json({list:result});
		});
  		
});


/*-----------------------订单模块---------------------------------*/
router.post('/findAllOrders', function(req, res, next) {
	console.log('访问到/findAllOrders');
	var uid = req.body.uid;
	console.log(uid);
    var myresult= [];
    var orids = [];//存放订单号
    var cmdresult = [];//存放商品的
    var cmdids =[];//存放商品号
    var pics = [];//存放图片
	var tasks = {
			  table_a: function(callback) {
			  		 var sql = "select orderCommodity.orId from orderCommodity,orders where orUserId = ? and orderCommodity.orId=orders.orId group by orders.orId;";
			 		 conn.query(sql,uid, function(err, result) {
						if(err){
								console.log('[查询订单 error:] 22222'+err.message);
								return;
							}else{
								
								for(var i=0;i<result.length;i++){
								   var string=JSON.stringify(result[i]);
								   // console.log('string ', string);
								   var data = JSON.parse(string);
								   var orid = data.orId;
								   orids.push(orid);
								}
							}
						callback(err, result);
				});
			  },
			  table_b: function(callback) {
				for(var i = 0; i< orids.length;i++){

					(function(i) {
						var params2 = [orids[i],uid];
						var sql = "select orderCommodity.*,orders.*,commodity.* from orderCommodity inner join orders on orderCommodity.orId = orders.orId inner join commodity on orderCommodity.cmdId = commodity.cmdId where orders.orId = ? and orUserId = ?;";
						// var resultb=[];
						conn.query(sql,params2, function(err, result) {
							if(err){
										console.log('[商品error] 22222'+err.message);
										return;
								}else{
										// resultb.push(result);
										//var orcmd = [];
										cmdresult.push(result);
										for(var ii=0;ii<result.length;ii++){
												console.log('一个订单中商品的个数'+result.length);
												var string=JSON.stringify(result[ii]);
												//console.log('string ', string);
												var datacmd = JSON.parse(string);
												//console.log('data ', datacmd);
												cmdids.push(datacmd.cmdId);//商品id
												//此处异步第一层i已经变成了orids.length
												if(i==orids.length-1 && ii==result.length-1){
													//console.log('商品'+cmdids.length+'个');
													callback(null, result);	
												}
												
										}

										
										
								}
									
								
							});



						 })(i);
					}
					
			  },
			   table_c: function(callback) {
			   			console.log('cmdids.length'+cmdids.length);
			   			//var resultc = [];
			   		    for(var j=0;j<cmdids.length;j++){
			   		    		(function(j) {
					 			var sql = "select picUrl from pictures where picCmdId = "+cmdids[j];
										conn.query(sql,function(err,result){
											if(err){
														 console.log('图片表查询有误');
													}else{
														   var string=JSON.stringify(result[0]);
														   var data = JSON.parse(string);
														   // console.log('data ', data);
														   var picurl2 = data.picUrl;
														   // console.log('picurl2 ', picurl2);
														   pics.push(picurl2);
														  // resultc.push(picurl2);
														  
														   if(j==cmdids.length-1){
														   		// console.log('图片'+pics.length+'张');
																callback(null, result);
																	
															}
													}
													
								});
							})(j);
									
					    }
			  },
			  
		};

		async.series(tasks, function(err, results) {
			console.log('async.series');
		     if(err) {
			     console.log('err'+err);
		    } else {
		    	   console.log('所有结果');
		    	   var a = 0;
		    	   var fresult = {};
		    	   for (var i = 0; i < cmdresult.length; i++) {
			    	   		(function(i) {
			    	   				var orderid = {};
			    	   				for (var j = 0; j < cmdresult[i].length; j++) {
										// console.log('订单中商品的个数'+cmdresult[i].length);
										var string=JSON.stringify(cmdresult[i][j]);
										// console.log('string ', string);
										var datacmd = JSON.parse(string);
										// console.log('data ', datacmd);
										orderid[datacmd.cmdId] = {
												cmdPrice:datacmd.cmdPrice,
												cmdName:datacmd.cmdName,
												cmdDescribe:datacmd.cmdDescribe,
												cmdPic:pics[a]
										}
										a++;
										
								};
								myresult.push(orderid);
							})(i);
		    	   };

					var jsonresult = JSON.stringify(myresult);
					 var sult = JSON.parse(jsonresult);
					// console.log('我的结果'+jsonresult);
					 // console.log('我的结果'+sult);
					return res.json({list:sult});
			 
			}
		});			
});
module.exports = router;
