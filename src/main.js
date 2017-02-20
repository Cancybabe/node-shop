// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/bootstrap.css'
import './assets/css/home/index.css'
import './assets/css/com/com.css'
import './assets/css/brand/index.css'
import './assets/css/cart/index.css'
import './assets/css/good/index.css'
import './assets/css/help/app.css'
import './assets/css/help/weixin.css'
import './assets/css/list/style.css'
import './assets/css/login/index.css'
import './assets/css/member/about.css'
import './assets/css/topic/index.css'
import './assets/css/tuan/tuan.css'

import 'mint-ui/lib/style.css'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

//导入自定义组件
import home from './components/home/index.vue'
import order from './components/order/order.vue'
import shopcar from './components/shopcar/shopcar.vue'
import my from './components/my/my.vue'
import productlist from './components/product/list.vue'
import productdetail from './components/product/details.vue'
import login from './components/login/login.vue'
import register from './components/register/register.vue'
import address from './components/address/address.vue'
//分配路由
const router=new VueRouter({
		mode:'hash',
		base:__dirname,
		routes:[
			{
				path:'/',
				component:home,
			},
			{
				path:'/my',
				component:my,
			},
			{
				path:'/order',
				component:order,
			},
			{
				path:'/product',
				component:productlist,				
			},
			{
				path:'/productdetail',
				component:productdetail,
			},
			{
				path:'/shopcar',
				component:shopcar,
			},
			{
				path:'/login',
				component:login,
			},
			{
				path:'/register',
				component:register,
			},
			{
				path:'/address',
				component:address,
			}
		]
    });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})

