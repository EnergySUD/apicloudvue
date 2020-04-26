import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../public/script/api.js";
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/common/styles/base.css"; // 样式初始化
// import "@/common/js/rem.js"; // 引入rem自适应
Vue.use(Vant);

import axios from 'axios'
Vue.prototype.$axios = axios
// https://www.npmjs.com/package/qs  qs文档链接
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false

window.apiready = function () {
	// 将API链接Vue原型，后续通过this.$APICLOUD代替window.api
	Vue.prototype.$APICLOUD = window.api;
	window.api.setStatusBarStyle({
		style: 'dark',
		color: '#6ab494'
	});
}

if (window.navigator.userAgent.match(/APICloud/i)) {
	window.apiready = function() {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	};
} else {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount("#app");
}
