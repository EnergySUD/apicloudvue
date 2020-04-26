import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		component: () => import('../views/Index.vue')
	},
	{
		path: '/myLottery',
		name: 'MyLottery',
		component: () => import('../views/myLottery/index.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
