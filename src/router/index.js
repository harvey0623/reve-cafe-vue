import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js';
import TempView from '@/views/tempView/index.vue';
import Home from '@/views/home/index.vue';
import Signin from '@/views/signin/index.vue';
import Profile from '@/views/member/profile.vue';
import Register_Step1 from '@/views/register/step1.vue';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			auth: false,
			pageName:'首頁',
			breadcrumb: {
				title: '首頁',
				skip: false
			},
		}
	},
	{
		path: '/signin',
		name: 'signin',
		component: Signin,
		meta: {
			auth: false,
			pageName:'登入',
			breadcrumb: {
				title: '登入',
				skip: false
			}
		}
	},
	{
		path: '/register',
		component: TempView,
		meta: {
			auth: false,
			pageName:'',
			breadcrumb: {
				title: '',
				skip: true
			}
		},
		children: [
			{
				path: '',
				redirect: '/'
			},
			{
				path: 'step1',
				name: 'register-step1',
				component: Register_Step1,
				meta: {
					auth: false,
					pageName: '加入會員',
					breadcrumb: {
						title: '加入會員',
						skip: false
					}
				}
			}
		]
	},
	{
		path: '/member',
		component: TempView,
		meta: {
			auth: true,
			pageName: '',
			breadcrumb: {
				title: '',
				skip: true
			}
		},
		children: [
			{
				path: '',
				redirect: '/'
			},
			{
				path: 'profile',
				name: 'profile',
				component: Profile,
				meta: {
					auth: true,
					pageName: '會員資料',
					breadcrumb: {
						title: '會員資料',
						skip: false
					}
				},
			}
		]
	},
	{
		path: '*',
		redirect: '/'
	}
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

router.beforeEach(async (to, from, next) => {
	if (to.matched.some(item => item.meta.auth === true)) {
		router.app.$Progress.start();
		let checkResult = await store.dispatch('auth/checkLoginStatus');
		if (checkResult.status !== 1) {
			router.app.$Progress.finish();
			return next('/signin');
		}
	}
	router.app.$Progress.finish();
	return next();
});

export default router;