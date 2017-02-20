<template>
	<div class="com-content">
		 <div class="com-header-area" id="js-com-header-area">
                <a href="default.htm" class="com-header-logo"></a>
				<dfn></dfn>
                <p>
                 <input v-model="product_info" placeholder="搜索..." class="input-search">
                    <a class="com-header-search" id="header-search" @click="doSearch"><del></del></a>
                   
                    <a href="/#/shopcar" class="com-header-cart "><b id="header-cart-num">0</b><del></del></a>
                </p>
				<div class="clear"></div>
                
              
            </div>
			<!--list-->
             <div class="com-content-area" id="js-com-content-area">
				<div class="page-role">
					
					<div class="pxui-tab">
						 <a v-for="(item,index) in items" :class="{selected:item.active }" @click="makeActive(item,index)"  > {{ item.name }} </a>
				            
					</div>

					<div class="pxui-area">
						<div class="pxui-shoes">
			                 <div id="js-goodlist">
                    		 <template v-for="(list,index) in lists">
						         <a :href="'/#/productdetail?'+'cmdId='+list.cmdId">
								<div class="img160"><dfn></dfn><img v-bind:src="cmdPics[index]"/></div>
								<span class="name">{{ list.cmdName }}    {{  list.cmdDescribe }}</span>
								<span class="price">￥{{ list.cmdPrice }}</span>
								<del class="price">￥{{ list.cmdPrice }}</del>
			                   
			                                       
			                      </a>
               
                      		</template>
                          </div>
	                   </div>
						<div class="pxui-pages" pagesize="468" count="" url="" container="#js-goodlist"
			           
					</div>
					


				</div>
			 </div>	
			<div class="com-footer-area" id="js-com-footer-area">
			
			
		</div>
			
	</div>


</template>

<script>
    import Vue from 'vue'

	export default {
		data (){
			return {
			    lists:[],				
				items:[
					{name:"推荐",active:true},
					{name:"价格",active:false},
					{name:"销量",active:false},
					{name:"人气",active:false},
				],
				product_info:"",
				cmdPics:[]
				
			}	
		},
		mounted:function(){		
			 	// 代码保证 this.$el 在 document 中
			 	if (this.$route.query.name!=null) {
			 		    var cmdName = this.$route.query.name;
			 			this.doSearch2(cmdName);
			 	};	
			 	if (this.$route.query.laId!=null) {
			 		 this.setLabelProductInfo();
			 	};
			 	if (this.$route.query.cmdType!=null) {

			 		 this.setTypeProductInfo();
			 	};		 
			   
			 
			
		},
		methods : {
			setLabelProductInfo: function() {
				//加载信息页
				var _this=this;
				_this.lists=[];
				_this.cmdPics=[];
		        let laId = _this.$route.query.laId;
		        console.log(laId);
		        var params={ 'laId':laId};
		        _this.$http.post('/front/productlist',params).then(function(res) {
		        	_this.lists = res.data.list;
		        		_this.$nextTick(function(){
			        		for(var i=0;i<res.data.list.length;i++){
						        	_this.$http.post('/front/getTypeCmdPics',res.data.list[i]).then(function(res) {
						        			console.log("kkk"+res.data.list.picUrl);
						        			_this.cmdPics.push(res.data.list.picUrl);
						        	});	
			        		 }
		        		 });	

		        	
		        });	
		        	
		    },
		    setTypeProductInfo: function() {
				//加载信息页
				var _this=this;
				_this.lists=[];
				_this.cmdPics=[];
		        let cmdType = _this.$route.query.cmdType;
		        console.log(cmdType);
		        var params={ 'cmdType':cmdType};
		        _this.$http.post('/front/typeCommodityList',params).then(function(res) {
		        		_this.lists = res.data.list;
		        		_this.$nextTick(function(){
			        		for(var i=0;i<res.data.list.length;i++){
						        	_this.$http.post('/front/getTypeCmdPics',res.data.list[i]).then(function(res) {
						        			console.log("kkk"+res.data.list.picUrl);
						        			_this.cmdPics.push(res.data.list.picUrl);
						        	});	
			        		 }
		        		 });	
		        });	
		        	
		    },
			makeActive:function(item,index){
				for (var i=0; i<this.items.length; i++) {
					this.items[i].active=false;
				};
				this.items[index].active=true;
			},
			//当前页面的搜索
			doSearch:function(){
				//搜索信息				
				var _this=this;
				_this.lists=[];
				_this.cmdPics=[];
			    var params=_this.product_info;
			     console.log(params+'搜索信息')
				 var params={ 'product_info':params};
				_this.$http.post('/front/doSearch',params).then(function(res){
					console.log("接收返回的数据"+res.data.list);
					_this.lists = res.data.list;
					_this.$nextTick(function() {
						 for(var i=0;i<res.data.list.length;i++){
						        	_this.$http.post('/front/getTypeCmdPics',res.data.list[i]).then(function(res) {
						        			console.log("kkk"+res.data.list.picUrl);
						        			_this.cmdPics.push(res.data.list.picUrl);
						        	});	
			        		 }
		        		
			        })
		        	
		        	
				});
			},
			//首页的搜索
			doSearch2:function(cmdName){
				//搜索信息				
				var _this=this;
				_this.lists=[];
				_this.cmdPics=[];
			  //   var params=_this.$route.query.name;
				 // console.log(params+'搜索信息')
				  	var params={ 'product_info':cmdName};
					_this.$http.post('/front/doSearch',params).then(function(res){
							this.$route.query.laId=null;
							console.log("接收返回的数据"+res.data.list);
		 	        	    _this.lists = res.data.list;
				});
				
			},
		},
		computed : {
			
		}
	}
</script>

<style scoped>
	.pxui-tab a{
		width: 25%;
	}
	.input-search{
		margin-left: 10px;
		margin-top: 12px;
		width: 75%;
	}
	a{text-decoration:none}

</style>
