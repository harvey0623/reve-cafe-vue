import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
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

router.beforeEach((to, from, next) => {
	// if (to.matched.some(item => item.meta.auth === true)) {
	// 	let mmrmToken = cookie.get('mmrmToken');
	// 	if (mmrmToken === undefined) {
	// 		store.commit('auth/setLogin', false);
	// 		return next('/login');
	// 	}
	// }
	return next();
});

export default router
