<template>
	<div class="com-content">
		  <div class="com-header-area" id="js-com-header-area">
               <a  class="com-header-back "></a>
               <div class="header">
				<span class="com-header-title">注册Shopping网</span></div>
                <p>       
                    <a class="com-header-register " href="/#/register"></a>
                </p>
				
				<div class="clear"></div>

        </div>

             <div class="com-content-area" id="js-com-content-area">
                <!--content-->
              			  
			<div class="page-role">
			   
										
						<img class="com-myhead-logo" src="../../assets/images/login/login.jpg" width="250px" height="250px">
					</div>

				<form class="pxui-form-info" id="js-register-form">
					<p class="error-msg" id="js-error-msg"></p>
					<div><span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span><p><span><input id="js-username" placeholder="邮箱/手机号码" type="text"/>使用手机注册，赠送豪华大礼包</span></p></div>
					<div class="phone-box" style="display:none;"><span>&nbsp;</span><p><span><input id="js-get-phone" type="button" value="获取验证码"/></span></p></div>
					<div class="phone-box" style="display:none;"><span>验&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;码</span><p><span><input placeholder="请输入手机验证码" id="js-code" type="text"/></span></p></div>
			                <div><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span><p><span><input id="js-password" placeholder="6-16位密码" type="text"/></span></p></div>
			                <div><span>确认密码</span><p><span><input id="js-password" placeholder="6-16位密码" type="text"/></span></p></div>
			                <div><span>&nbsp;</span><p><span><input id="js-show-psw" checked="" type="checkbox" value="1"/> <label for="js-show-psw">显示密码</label></span></p>
			               
			                </div>
					<div><span>&nbsp;</span><p><span><input type="button" value="   注  册   " id="js-register" class="pxui-light-button"/></span></p></div>
				</form>
				<div id="js-phone-code-tip" style="margin:0 12px;display:none;">
					<b>收不到验证码，怎么办？</b><br/>
					1、检查是否被安全软件给拦截了<br/>
					2、现在短信的信道太过于拥堵了，再稍等片刻或者重新获取验证码<br/>
					3、用该号码联系客服人员验证<br/>客服电话：<a href="tel_3A4008818283" style="text-decoration:underline;">400-8818283</a>（收取市话费）<br/>&nbsp;
				</div>
			</div>
			<!--content-end-->
		</div>
	</div>


</template>
<script>
	

</script>

<style scoped>
	#js-username,#js-password{
		padding: 20px;border-radius: 10px
	}	
	.com-myhead-logo{
		border-radius: 40px;margin-bottom: 40px;margin-top: 30px
	}
	.com-header-title{
		font-size: 20px;
	}
</style>