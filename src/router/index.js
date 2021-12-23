import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue';
import store from '@/store/index.js';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			auth: false,
		}
	},
]

const router = new VueRouter({
	mode: 'hash',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash
			};
		} else {
			return { x: 0, y: 0 };
		}
	}
})

router.beforeEach(async(to, from, next) => {
	if (to.matched.some(item => item.meta.auth === true)) {
		let checkResult = await store.dispatch('auth/checkLoginStatus');
		if (checkResult.status !== 1) return next('/signin');
	}
	return next();
});

export default router;