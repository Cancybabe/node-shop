<template>
	<div class="com-content">
	<!--头部区域-->
		<div class="com-header-area" id="js-com-header-area">
			 <a  class="com-header-back " href="/#/"></a>
               <div  class="header">
					<span class="header-title">商品详情</span></div>
                <p>       
                    <a href="/#/shopcar" class="com-header-cart "><b id="header-cart-num">0</b><del></del></a>
                </p>
				
				<div class="clear"></div>

		</div>
		<!-- 内容区域-->
		<div class="com-content-area" id="js-com-content-area">
			<!--content-->
            <div class="page-role good-page">
            	
			<div class="pxui-area">
        <h1>
              {{ cmdName }}  {{ cmdDescribe }} 
        </h1>
                  

		<div class="touchslider">
			<div class="touchslider-viewport" style="height:280px;overflow:hidden"><div>
			  <div class="touchslider-item"><a><span class="img320"><dfn></dfn><img v-bind:src="cmdPic"/></span></a></div>
			 
			</div></div>
		</div>		
		
        <ul class="goodinfo" id="js-goodinfo">
                        <li>
                <b name="detail_mao" id="detail_mao">商品价格:</b><div><p><strong class="pxui-color-red">￥{{ cmdPrice }}</strong> <del class="pxui-color-gray">￥{ {cmdPrice }}</del></p></div>
            </li>
            <li>
                <b>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费:</b>
                <div>
                    <p>
                        <span>免运费 ,支持货到付款</span> 
                                            </p> 
                </div>
            </li>
            <li>
                <b>颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</b>
                <div><p>
                        
                      
               			<span>{{cmdColor}}</span> 
                                         			
                    </p></div>
            </li>
                        <!--size-message-->
            <li>
                <b>尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</b>
                <div>
                    <p class="sizes">
                   		<span>{{cmdSize}}码</span>                       
                    </p>
                </div>
            </li>
            <!--size-message-end-->
                    </ul>
               
                <input type="button" class="pxui-light-button addtocart" value="加入购物车" v-on:click="addToCar"/>
               
        <div></div>

         
     
                <h3>用户评论<a href="#">返回顶部<i class="arrow2-top"></i></a></h3>
				

        <div id="js-comment-list" style="display:block;">
         
            <ul class="comment-list" id="js-commentlist">
            	<li v-for="comment in comments">
            		<div >
					<h5 class="h4-user">用户: {{ comment.uName }}</h5>
					<p class="p-comment">{{ comment.cmContent }}</p>
				  </div>
            	</li>

            </ul>
        
        </div>

    </div>
				

            </div>
		</div>
	<div>
		

	</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default{
		data(){
			return{
                carCmdId:"",
			 	comments:[],
			 	cmdName:"",
			 	cmdDescribe:"",
			 	cmdPrice:"",
			 	cmdColor:"",
			 	cmdSize:"",
                goodlist:"hehhe",
                cmdPic:""

			}
		},
		mounted:function(){
			 this.$nextTick(function () {
			 	// 代码保证 this.$el 在 document 中
			    this.setProductDetail();
			  })
		},
		methods:{

			setProductDetail:function(){
				var _this=this;

				let cmdId= _this.$route.query.cmdId;
				console.log(cmdId);
                this.carCmdId = cmdId;

		        var params={ 'cmdId':cmdId};
		        _this.$http.post('/front/productDetail',params).then(function(res) {
		        	console.log(res.data.comment+"商品评论信息");
		        	console.log(res.data.product+"商品详情信息");
		        	var comment=res.data.comment;
		        	var product=res.data.product;
		        	  _this.$nextTick(function() {
		        		//显示商品信息
		        		_this.cmdName=product[0].cmdName;
		        		_this.cmdDescribe=product[0].cmdDescribe;
		        		_this.cmdPrice=product[0].cmdPrice;
		        		_this.cmdColor=product[0].cmdColor;
		        		_this.cmdSize=product[0].cmdSize;
		        		//显示评论信息
		        		for(var i=0;i<comment.length;i++){
		        			_this.comments.push(comment[i]);
		        		}
			        });
		        });

		        _this.$http.post('/front/getTypeCmdPics',params).then(function(res) {
						console.log("kkk"+res.data.list.picUrl);
						_this.cmdPic = res.data.list.picUrl;
				});		
			},
            addToCar:function(){
                var _this = this;
                // this.$store.dispatch('UPDATE','helo');
                // console.log("store.state.goodLists"+this.$store.state.goodLists);
                let cmdid = this.carCmdId;
                var params = {'cmdid':cmdid};
                console.log("添加到购物车的商品参数"+params.cmdid);
                _this.$http.post('/front/addToCar',params).then(function(res){
                        console.log("添加购物车成功");
                });


            }
		}
	}

</script>

<style scoped>
	.h4-user{
		text-align: left;
	}
	.p-comment{
		text-align: left;
		margin-left:10px 
	}
	a{text-decoration:none}

</style>    