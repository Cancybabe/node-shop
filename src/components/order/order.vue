<template>
	<div class="com-content">
		 <div class="com-header-area" id="js-com-header-area">
               <a  class="com-header-back "></a>
               <div  class="header">
					<span class="header-title">订单列表</span></div>
                <p>       
                    <a class="com-header-register " href="/#/register"></a>
                    <a href="/#/shopcar" class="com-header-cart "><b id="header-cart-num">0</b><del></del></a>
                </p>
				
				<div class="clear"></div>
        </div>
		 <div class="com-content-area" id="js-com-content-area">
			<div class="page-role">
					
				<div class="pxui-tab">
				 <a v-for="(item,index) in items" :class="{selected:item.active }" @click="makeActive(item,index)"  > {{ item.name}} </a>
				            
				</div>
			</div>
			<ul>
				<template v-for="(_obj,index) in orders">
					<li>
						<div class="orderlist">
							<div class="orderstatus">
								<p>已完成</p>
							</div>
								<ul class="orderdetail">
									<template v-for="value in _obj">
										<li class="ui-list-item order-goods">
											<span class="order-goods-pic"> 
												<img v-bind:src="value.cmdPic" alt="">	
											</span>
											<div class="order-goods-des">
												<h5 class="order-goods-name">{{value.cmdName}}</h5>
												<p class="order-goods-sku">  {{value.cmdDescribe}}   </p>
											</div>
											 <p class="order-goods-price">
												<span class="price-origin">￥{{value.cmdPrice}}</span>
												<br>
												<span class="price">￥{{value.cmdPrice}}</span>
												<br>
												<span class="number">×1</span>
											</p>
										</li>
									</template>
								</ul>
							<div class="price-line clearfix"> 
					  <span class="delivery">包邮</span>
					  <span class="pay-price">合计：<em class="price">{{total(index)}}</em></span>
					 </div>
				</div>
				</li>
			 </template>
			</ul>
		</div>

</div>
	
</template>

<script>
	 import Vue from 'vue';
	 export default {
		data (){
			return {				
				items:[
					{name:"全部",active:true},
					{name:"待付款",active:false},
					{name:"待收货",active:false},
					{name:"待评价",active:false},
				],
				orders: [],
					
			}	
		},
		mounted: function(){
			this.findOrderInfo();
		},

		methods : {
			makeActive:function(item,index){
				for (var i=0; i<this.items.length; i++) {
					this.items[i].active=false;
				};
				this.items[index].active=true;
			},
			findOrderInfo: function() {
		        let temp = this.$route.query.token; 
		        var token={ 'token':temp};//当前用户的token
		        var user = {'uid':2};//用户id

		        this.$http.post('/front/findAllOrders',user).then(function(res) {
		        	this.orders = res.data.list;
		        	let data1 = res.data;
		        	let data2 = res.data.list;
		        	console.log( data1);
		        	console.log( data2);
		         });	
		        	
		    },
		    total: function(index){
                        var total = 0;
                        for(var x in this.orders[index]){
                        	total += this.orders[index][x].cmdPrice;
                        }
                       return total;
                    }

		},
	}

</script>
	
<style scoped>
	.header-title{
		font-size: 20px;
		
	}
	.header{
		text-align: center;
		margin-top:-30px; 
	}
	.pxui-tab a{
		width: 25%;
	}
	.orderlist{
		border:1px solid #ddd;
		width:100%;
		display: block;
		background: #fff;
	}
	.orderstatus {
		height: 40px;
		margin-left:10px; 
		margin-top: 5px;
		text-align: left;
		color: red;
		border-bottom: 1px solid #ddd;
	}
	.orderdetail{
		position: relative;
	}

	.order-goods-pic{
		margin-left:10px; 		
	    float: left;
	    width: 60px;
	    height: 60px;
	    padding: 1px;
	    border: solid 1px #e2e2e2;
	}
	
	img {
	    border: none;
	    vertical-align: middle;
	    width: 56px;
	    height: 56px;
	}
	.order-goods {
	    position: relative;
	    min-height: 90px;
	    padding: 15px 0!important;
	}
	.order-goods-des {
	    margin-left: 70px;
	    width: 55%;
	}
	.order-goods-name {
	    margin-top: -2px;
	    margin-bottom: 5px;
	    max-height: 40px;
	    line-height: 18px;
	    font-size: 14px;
	    font-weight: 400;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	}
	.order-goods-sku {
	    margin-bottom: 5px;
	    font-size: ;: 12px;
	    color: #999;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	li{
		line-height: 20px;
	}
	.order-goods-price {
		margin-right:10px; 
	    position: absolute;
	    right: 0;
	    top: 10px;
	    text-align: right;
	    line-height: 25px;
	}
	.order-goods-price .price-origin {
	    text-decoration: line-through;
	    color: #999;
	}
	.order-goods-price .number {
	    color: #999;
	}
	.ui-list-item{
		border-bottom: 1px solid #ddd;
	}
	.price-line {
	    margin: 0 -10px;
	    padding: 10px 10px;
	    border-top: 1px solid #e5e5e5;
	    text-align: right;
	    color: #999;
	}
	 .price-line .delivery{	
	    margin-right: 10px;
	   text-align: right;
	}
	.price-line .price {
		margin-right:5px; 
		line-height: 30px;
	    font-size: 20px;
	    color: #f43c32;
	}
	em, i {
	    font-style: normal;
	}
	a{text-decoration:none}
	
</style>