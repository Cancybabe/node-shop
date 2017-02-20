<template>
	<div class="com-content">
		<div class="views clearfix">
			<!--头部-->
			<div class="head-box">
			     <div class="user-avatar"> 
			      <img src="http://s2.mogucdn.com/new1/v1/bdefaultavatar/05.jpg_170x170.jpg "class="myhead">
			     </div>
			     <h4>	{{ uNickName }}</h4>
			     <p>{{ uName }}</p>
			      <a class="address-link" href="javascript:;" data-href="http://h5.mogujie.com/mgj-address/list.html"> 
			      <p class="user-address":href="'/#/address?uid='+uid">我的收货地址&gt;</p></a>
		    </div>
		    <!--订单部分-->
		    <div class="content-box">
		    	<div class="order-info">
		    	   <!--上半部分-->
		    	     <a class="order-header J_link" href="/#/order"> 
		    	     <div class="item-text"> 
		    	        <p class="order-icon"><img src="http://s16.mogucdn.com/p1/160727/upload_ie4wenzume4tsmjqmezdambqgqyde_56x56.png"></p> <p class="order-title">我的订单</p> </div>
		    	     </a>
		    	    <!--下半部分--> 
		    	     <div class="order-tips"> 
		    	     	<a class="tips-text J_link" >
		    	           <div class="tips-icon">
		    	                <img src="http://s17.mogucdn.com/p1/160829/idid_ifqwcmddgrswkzdbmezdambqgyyde_38x33.png"> 
		    	                 <div class="point-icon">   </div>
		    	            </div> 
		    	            <p class="tips-name">待付款</p> </a>
		    	        <a class="tips-text J_link" > 
		    	           <div class="tips-icon"> 
		    	             <img src="http://s16.mogucdn.com/p1/160829/idid_ie4dcoddmnswkzdbmezdambqgiyde_38x36.png"> 
		    	             <div class="point-icon">  </div> 
		    	             </div> 
		    	             <p class="tips-name">待收货</p> </a> 
		    	      <a class="tips-text J_link" > 
		    	           <div class="tips-icon"> 
		    	             <img src="http://s16.mogucdn.com/p1/160829/idid_ie4dcoddmnswkzdbmezdambqgiyde_38x36.png"> 
		    	             <div class="point-icon">  </div> 
		    	             </div> 
		    	             <p class="tips-name">待评价</p> </a>
		    	         <a class="tips-text J_link" > 
		    	           <div class="tips-icon"> 
		    	             <img src="http://s16.mogucdn.com/p1/160829/idid_ie4dcoddmnswkzdbmezdambqgiyde_38x36.png"> 
		    	             <div class="point-icon">  </div> 
		    	             </div> 
		    	             <p class="tips-name">售后</p> </a> 
		    	    </div>
		    	 </div>
		    	  <div class="out-content"> <a class="logout" >退出登录</a> </div>
		    </div>
		   
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data(){
			return{
				uName:"",
				uNickName:"",
				uid:"",
			}
		},
		mounted:function(){
			 this.setMyInfo();
		},
		methods:{
			setMyInfo:function(){

				
				var params={'uid':"1"};
				 this.$http.post('/front/my',params).then(function(res) {
				       var user=res.data.list[0];
				       this.uNickName=user.uNickname;
				       this.uName=user.uName;
				       this.uid=user.uid;
				 });
			}

		}

	}



</script>
<style scoped>
	a {
	    text-decoration: none;
	}
	.user-avatar{
		margin-top: 20px;
	}
	.myhead{
		border-radius: 30px;
	}
	.user-name{
		margin-top: 10px;
		font-size: 26px;
	}
	.content-box{
		background-color: #f6f6f6;
	    width: 100%;
	    padding-bottom: 12px;
	    overflow: hidden;
	}
	.content-box .order-info {
	    width: 100%;
	    margin-top: 15px;
	    background-color: #fff;
	}
    .order-header {
	    display: block;
	}
	.item-text {
	    border-bottom: 1px solid #e5e5e5;
	    height: 50px;
	    overflow: hidden;
	}
	.order-icon{
		width: 60px;
		height: 50px;
		float: left;
	}
	 .order-icon img {
	 	margin-top:2px; 
		text-align: center;
	    display: block;
	    width: 28px;
	    height: 28px;
	    margin: 5px auto;
	    text-align: center;
	    border-radius: 50%;
	}
	.order-title{
		margin-top:5px; 
		text-align: center;
		width: 64px;
		height: 50px;
		float: left;
		color:#333;
	    white-space: nowrap;
	    font-size: 20px;
	}
	.order-tips{
		width: 100%;
		height: 64px;
		line-height: 21px;
	}
	.content-box .order-info .order-tips .tips-text {
		margin-top: 10px;
	    display: block;
	    width: 25%;
	    height: 64px;
	    float: left;
	}
	.content-box .out-content {

		position: fixed;
		margin-bottom: 20px;
	    width: 100%;
	    height: 30px;
	    margin-top: 20px;
	    line-height: 21px;
	}
	.content-box .out-content .logout {
		
		
	    display: block;
	    width:80%;
	    height: 30px;
	    line-height: 30px;
	    color: #fff;
	    background-color: #ff5777;
	    font-size: 15px;
	    margin: 0 auto 10px;
	    border-radius: 4px;
	    text-align: center;
	}
</style>