<template>
	<div class="com-content">
		 <div class="com-header-area" id="js-com-header-area">
               <a  class="com-header-back "></a>
					 <div class="header">
				<span class="com-header-title">登&nbsp&nbsp录</span></div>
                <p>       
                    <a class="com-header-register " href="/#/register"></a>
                </p>
				
				<div class="clear"></div>

        </div>
		  <div class="com-content-area" id="js-com-content-area">
                <!--content-->
			    <div class="page-role login-page">		
					<div>						
						<img class="com-myhead-logo" src="../../assets/images/login/login.jpg" width="250px" height="250px">
					</div>
			        <form autocomplete="off" class="pxui-form-info" id="js-login-form" method="post"  @submit.prevent="submit">
			        <input type="hidden" name="rtnurl" value="index"/>
					 <p class="error-msg" id="js-error-msg"></p>
			        <div><span>账&nbsp;&nbsp;&nbsp;&nbsp;号</span><p><span>
			        <input name="username" id="js-username"  type="text" v-model="account"/></span></p></div>
					<div><span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span><p>
					<span>
					<input name="pwd" id="js-password" type="password" v-model="password"/></span></p></div>
					<div><span>&nbsp;</span><p><span>
					<input type="submit" id="js-login" value="   登  录   " class="pxui-light-button" @click="login"/>
					<a class="pxui-gray-button" href="forget_phone">找回密码</a>
			                		</span></p></div>
				</form>

				
			</div>
			<!--content-end-->
		</div>

	</div>	

</template>


<script>
	export default {
    data() {
        return {
	           account : '邮箱/手机号码',
               password : ''
           
        }
    },
    methods:{
      submit:function(){
      	//alert('hehe');
      	 let params = { 
               account : this.account,
               password : this.password
         };
      	//var formData = JSON.stringify(this.user); // 这里才是你的表单数据
        // 获取已有账号密码
        this.$http.post('front/login',params)
          .then((response) => {
            // 响应成功回调
            console.log(response);
           
            // // 创建一个账号密码
            // return this.$http.post('/api/login/createAccount',params);
          })
          .then((response) => {
            console.log(response)
          })
          .catch((reject) => {
            console.log(reject)
          });
        }
      }
    }

</script>
	



<style scoped>
	#js-username,#js-password{
		padding: 20px;border-radius: 10px
	}	
	.com-myhead-logo{
		border-radius: 40px;margin-bottom: 40px;margin-top: 30px
	}
	.com-header-register{	
		margin-top:10px; 
		margin-right:5px; 
		width: 40px;
		height: 40px;
		background: url(../../assets/images/good/register.png) no-repeat ;
		} 
	.com-header-back{
		margin-top:10px; 
		margin-left:5px; 
		width: 40px;
		height: 40px;
		background: url(../../assets/images/good/back.png) no-repeat;
		} 
		.com-header-title{
			font-size: 20px;
		}
</style>
