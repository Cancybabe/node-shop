<template>
	<div class="com-content">
		 <div class="com-header-area" id="js-com-header-area">
               <a  class="com-header-back "></a>
               <div  class="header">
					<span class="header-title">购物车</span></div>
                <p>       
                   <a class="com-header-edit"></a>
                </p>
				
				<div class="clear"></div>

        </div>

        <section class="cart ui-form">
        	<div class="cart-panel">

        		<div class="ui-panel" v-for="g in goodslist">
        		  <h3 class="ui-panel-hd"> 
        			  <input type="checkbox" class="ui-checkbox c-shop" id="c-s-1cxkuk" v-model = "checked"> 
        	      </h3>
        	      <div class="ui-panel-bd" data-shopid="1cxkuk"> 
        	       <ul class="ui-list cart-goods"> 
        	         <li class="ui-list-item " > 
        	           <a href="" class="cart-goods-pic">
        	            <img class="fadeIn" src="../../assets/images/good/lanqiu.jpg">  
        	            </a>
        	           <div class="cart-goods-des"> 
	        	           <div class="cart-goods-img-sku ">
		        	           <a href=""><h5 class="cart-goods-name">{{g.cmdName}}</h5></a> 
		        	           <p class="cart-goods-sku">{{g.cmdColor}}  {{g.cmdSize}}  </p>  
	        	           </div> 
	        	             <div class="cart-goods-price-count"> 
		        	             <p class="cart-goods-price"> 
		        	              <span class="price">￥44.99</span>
		        	              <span class="price-origin">{{g.cmdPrice}}</span> 
		        	              <span class="cart-goods-count">x1</span>
		        	             </p>
		        	         	
		        	             
		        	         </div> 
        	            </div>
        	            </li>
        	          </ul>
        		  </div>
        		</div>
        	</div>
   		<ul>
        	<li v-for="d in gds">{{d}}</li>
        </ul>

        </section>

     


	</div>

</template>

<script>
import Vue from 'vue';
export default {
	data (){
		return{
			goodslist:[{cmdName:'韩版修身体恤衫纯棉圆',cmdColor:'黑色',cmdSize:'L',cmdPrice:'64.28'},{cmdName:'韩版修身体恤衫纯棉圆',cmdColor:'黑色',cmdSize:'L',cmdPrice:'64.28'}],
			gds:[],
		}
	},
	mounted: function(){
			//this.getGoodLists();
			 this.$nextTick(function () {
			 	// 代码保证 this.$el 在 document 中
					this.getAllGood();
			  })
			
 	 },
 	 methods:{
 	 // 	getGoodLists:function(){
			// this.gds = this.$store.state.goodLists;
 	 // 	}
 	 		getAllGood:function(){
 	 					var _this = this;
						_this.$http.get('/front/allshopcar').then((response) => {
						  console.log(response.data.list) 
						  this.goodslist = response.data.list;
						}, (error) => {
						  console.log(error)
						})


 	 		}
 	 }
	
	
	
}
	

</script>

<style>
	.header-title{
		font-size: 20px;
		
	}
	.header{
		text-align: center;
		margin-top:-30px; 
	}
	.com-header-edit{
		margin-top:10px; 
		margin-right:5px; 
		width: 40px;
		height: 40px;
		background: url(../../assets/images/good/edit.png) no-repeat ;
	}
	section{
		display: block;
	}
	.cart-panel {
	    padding-bottom: 80px;
	}
	.cart-panel {
	    min-height: 300px;
	    padding-bottom: 50px;
	}
	.cart-panel .ui-panel {
	    margin: 15px 0;
	    border: none;
	    border-top: 1px solid #d8d8d8;
	    border-bottom: 1px solid #d8d8d8;
	    background: #fff;
	}
	ul{
		margin: 0px;
		padding: 0px;
		line-height: 28px;
		list-style: none;
	}
   .ui-panel-hd {

		text-align: left;
	    padding: 8px 15px;
	    border: none;
	    font-size: 14px;
	    font-weight: 400;
	    background: #fff;
	    border-bottom: 1px solid #e5e5e5;
	}
	.cart-panel .ui-panel-hd .ui-checkbox {
	    margin-right: 5px;
	}
	.ui-form .ui-checkbox {
	    width:20px;
	    height: 20px;
	    background: url(../../assets/images/cart/checkbox.png) 0 100% no-repeat;
	    background-size: 20px auto;
	}
	input[type="checkbox"]{
		vertical-align:middle;
	    outline: 0;
	    color: #424242;
	    -webkit-appearance: none;
	    -webkit-user-select: text;
	}
	.ui-panel .ui-panel-bd {
	    padding: 10px;
	}
	.cart-goods .ui-list-item {
	    position: relative;
	    min-height: 125.5px;
	    padding: 10px 5px 10px 40px;
	    padding-bottom: 0;
	    border-bottom: 0;
	    transition: all 1s;
	    -moz-transition: all 1s;
	    -webkit-transition: all 1s;
	    -o-transition: all 1s;
	}
	.cart-goods-pic {
	    float: left;
	    width: 72px;
	    height: 96px;
	    position: relative;
	    overflow: hidden;
	}
	.cart-goods-pic img {
		text-align: left;
		 border: none;
	    vertical-align: middle;
	    height: 92.625px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    -webkit-transform: translate(-50%,-50%);
	    -moz-transform: -moz-translate(-50%,-50%);
	    -ms-transform: -ms-translate(-50%,-50%);
	}
	.cart-goods-des {
	    position: relative;
	    margin-left: 80px;
	    height: 96px;
	}
	.cart-goods-img-sku {
	    height: 85px;
	}
	.cart-goods-sku {
		text-align: left;
	    height: 40px;
	    color: #999;
	    font-size: 10px;
	}
	.cart-goods-price-count {
	    line-height: 16px;
	    position: relative;
	}
	.cart-goods-price {
	    text-align: left;
	}
	.cart-goods-price .price {
	    font-size: 16px;
	    color: #333;
	}
	.cart-goods-price-count .price-origin {
	    font-size: 12px;
	    text-decoration: line-through;
	    color: #999;
	}

	.cart-goods-count {
		float: right;
	    color: #999;
	    font-size: 12px;
	}
	li {
	    display: list-item;
	    text-align: -webkit-match-parent;
	}
	.cart-goods-name {
		text-align: left;
	    margin-top: -3px;
	    font-size: 14px;
	}
	
</style>