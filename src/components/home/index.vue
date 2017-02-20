
<template>	
	<div class="com-content">
	    <div class="com-header-area" id="js-com-header-area">
              
                <p>
                 <input v-model="product_info"placeholder="搜索..." class="input-search">
                    <a class="com-header-search" id="header-search" :class="{'active':true}" @click="doSearch" v-bind:href="url" ><del></del></a>
                   
                    <a href="/#/shopcar" class="com-header-cart "><b id="header-cart-num">0</b><del></del></a>
                </p>
				
				<div class="clear"></div>

        </div>
        <div class="com-content-area" id="js-com-content-area">
	    <div class="page-role home-page">	
	    <div id="index_swipe" class="">	
		<mt-swipe 
			:auto="3000" 
			:speed="400"
			:continuous="continuous"
			:showIndicators="showIndicators"
			:prevent="prevent"
			class="index_swipe"
		>
			<mt-swipe-item class="slide1">
				<img src="../../assets/img/slide/11.jpg" alt="">
			</mt-swipe-item>
			<mt-swipe-item class="slide2">
				<img src="../../assets/img/slide/22.jpg" alt="">
			</mt-swipe-item>
			<mt-swipe-item class="slide3">
				<img src="../../assets/img/slide/33.jpg" alt="">
			</mt-swipe-item>
		</mt-swipe>		
	    </div>
		<!-- -->
	    <div class="tags">
			<table border="0" cellspacing="5" cellpadding="0">
				<tr>
					<td colspan="2"><a href="help/app.html"><i></i>ShoppingMallAPP<br/>总能找到你的至爱</a></td>
					<td><a href="topic/612.html"><i></i>热门商品</a></td>
					<td rowspan="2"><a href="topic/612.html"><i></i>低<br/>价<br/>促<br/>销</a></td>
				</tr>
				<tr> 	 	
					<td><a href="topic/612.html"><b>最新</b><br/>上架</a></td>
					<td colspan="2"><a href="help/weixin.html">Shopping微信<br/>热评商品<i></i></a></td>
				</tr>
			</table>
	    </div>
        
	  <a :href="'/#/product?cmdType='+'运动馆'" >
	   <div class="pxui-area styles">
		 <h2 style="background-color: #ffaf51 ;"  ><a :href="'/#/product?cmdType='+'运动馆'"  style="color:#FFFFFF;"  >运动馆</a></h2>
	     <a class="max" :href="'/#/product?cmdType='+'运动馆'"><img src="../../assets/images/home/55.jpg" width="120" height="140"/></a>
	       <div>
		   <p>
		  <!--  <router-link :to="{ path: 'product', query:{ laName: '你好' }}">Register</router-link> -->
		    <template v-for="item in items">
	        <a  :href="item.url" style=" margin-right:3px;background-color: #ffaf51; color:#FFFFFF;border: 1px solid #ffaf51; " >{{ item.comLabel }}</a>
	        </template>
			</p>
		</div>
	  </div>
	  </a>
	  <a :href="'/#/product?cmdType='+'女鞋类'">
	  <div class="pxui-area styles">
		      <div>

				<p>
				  <template v-for="item in items1">
				     <a  :href="item.url" style="margin-left:3px;margin-right:0px;background-color: #ff8080; color:#FFFFFF;border: 1px solid #ff8080; " >{{ item.comLabel}}</a>
					</template> 
				</p>
			    </div>
                <a class="max":href="'/#/product?cmdType='+'女鞋类'"><img src="../../assets/images/home/44.jpg" width="120" height="140"/></a>
	          <h2 style="background-color: #ff8080" ><a :href="'/#/product?cmdType='+'女鞋类'" style="color:#FFFFFF;"  >女鞋类</a></h2>
        </div>
        </a>
        <a :href="'/#/product?cmdType='+'服装类'" >
     <div class="pxui-area styles">
          <h2  style="background-color: #688fd0 ; " ><a :href="'/#/product?cmdType='+'服装类'"  style="color:#FFFFFF;"  >服装类</a></h2>
		<a class="max" href="playboy/default.htm"><img src="../../assets/images/home/11.jpg" width="120" height="140"/></a>
        <div>
		<p>		 
		  <a v-for="item in items2" :href="item.url" style="margin-right:3px;background-color: #688fd0; color:#FFFFFF;border: 1px solid #688fd0; " >{{ item.comLabel }}</a>		
		</p>
		</div>
       </div>
       </a>
       <a :href="'/#/product?cmdType='+'家居类'">
      <div class="pxui-area styles">
           <div>
			<p>
			
		    <a v-for="item in items3" :href="item.url" style="margin-left:3px;margin-right:0px;background-color: #c49741; color:#FFFFFF;border: 1px solid #c49741; " >{{ item.comLabel }}</a>
			</p>
		</div>
            <a class="max" href=""><img src="http://img-cdn2.paixie.net/newspic/20140408/1396917323bc9d22.jpg" width="120" height="140"/></a>
		<h2 style="background-color: #c49741" ><a :href="'/#/product?cmdType='+'家居类'"  style="color:#FFFFFF;"  >家居类</a></h2>
         </div>
         </a>
         <a :href="'/#/product?cmdType='+'户外类'">
        <div class="pxui-area styles">
            <h2  style="background-color: #875e78 ; " ><a :href="'/#/product?cmdType='+'户外类'"  style="color:#FFFFFF;"  >户外类</a></h2>
		<a class="max" href=""><img src="../../assets/images/home/22.jpg" width="120" height="140"/></a>
                		<div>
			<p>
			      <a v-for="item in items4 ":href="item.url" style="margin-right:3px;background-color: #875e78; color:#FFFFFF;border: 1px solid #875e78; " >{{ item.comLabel}}</a>
			</p>
		</div>
        </div>
        </a>
        <a :href="'/#/product?cmdType='+'儿童馆'">
        	<div class="pxui-area styles">
                		<div>
			<p>
			  
		     <a v-for="item in items5":href="item.url"style="margin-left:3px;margin-right:0px;background-color: #94d15e; color:#FFFFFF;border: 1px solid #94d15e; " >{{item.comLabel}}</a>
			</p>
		</div>
           <a class="max" href=""><img src="../../assets/images/home/66.jpg" width="120" height="140"/></a>
		<h2 style="background-color: #94d15e" ><a :href="'/#/product?cmdType='+'儿童馆'"  style="color:#FFFFFF;"  >儿童馆</a></h2>
      </div>
       </a>
	
	</div>
	</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { Swipe, SwipeItem } from 'mint-ui';
	
   
	Vue.component('mt-swipe', Swipe);
	Vue.component('mt-swipe-item', SwipeItem);

	export default {
		name: 'index_swipe',
		data (){
			return {
				continuous : true,
				showIndicators : true,
				prevent : true,
				items:[],
				items1:[],
				items2:[],
				items3:[],
				items4:[],
				items5:[],
				product_info:"",
				url:"",
			}	
		},


		mounted:function(){
				var _this=this;
				_this.$http.post('front').then(function(res) {
   
                        console.log(res.data.list)
                        _this.$nextTick(function(){
                        for (var i = 0; i < res.data.list.length; i++) {
                        	switch(res.data.list[i].ctName){
                        		case"运动馆":
                        		var data={"comLabel":res.data.list[i].laName,
                        					"url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items.push(data);
                        		break;
                        		case"女鞋馆":
                        		var data={"comLabel":res.data.list[i].laName,
                        	             "url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items1.push(data);
                        		break;
                        		case"服装类":
                        		var data={"comLabel":res.data.list[i].laName,
                        	             "url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items2.push(data);
                        		break;
                        		case"家居馆":
                        		var data={"comLabel":res.data.list[i].laName,
                        	             "url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items3.push(data);
                        		break;
                        		case"户外馆":
                        		var data={"comLabel":res.data.list[i].laName,
                        	             "url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items4.push(data);
                        		break;
                        		case"儿童馆":
                        		var data={"comLabel":res.data.list[i].laName,
                        	             "url":'/#/product?laId='+res.data.list[i].laId}
                        	    _this.items5.push(data);
                        		break;

                        	}
                        	 
                        };
                       
                        console.log(res.data.list[0].laName);
                  });
			});
			console.log("进入到着了");
			
		},
		methods : {
			doSearch:function(){				
				this.url="/product?name="+this.product_info;
				//this.$router.push(this.url);
			}
		},
		computed : {
			
		}
	}


</script>

<style scoped>
	
	/*首页轮播图*/
	.index_swipe {
		width: 100%;
		height: 200px;
	}
	.index_swipe .slide1 {
		
	}
	.index_swipe .slide2 {
	
	}
	.index_swipe .slide3 {
		
	}
	.input-search{
		margin-left: 10px;
		margin-top: 12px;
		width: 75%;
	}
	a{text-decoration:none}
</style>