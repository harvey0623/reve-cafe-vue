import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js';
import { checkEntrance } from './middleware/checkEntrance.js';
import TempView from '@/views/tempView/index.vue';
import Home from '@/views/home/index.vue';
import Signin from '@/views/signin/index.vue';
import Profile from '@/views/member/profile.vue';
import Register_Step1 from '@/views/register/step1.vue';
import Register_Step2 from '@/views/register/step2.vue';
import Forgot_Step1 from '@/views/forgot/step1.vue';
import Forgot_Step2 from '@/views/forgot/step2.vue';
import Forgot_Step3 from '@/views/forgot/step3.vue';

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
		},
		beforeEnter: checkEntrance
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
			},
		},
		beforeEnter: checkEntrance,
		children: [
			{
				path: '',
				redirect: 'step1'
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
			},
			{
				path: 'step2',
				name: 'register-step2',
				component: Register_Step2,
				meta: {
					auth: false,
					pageName: '帳號驗證',
					breadcrumb: {
						title: '帳號驗證',
						skip: false
					}
				}
			}
		]
	},
	{
		path: '/forgot',
		component: TempView,
		meta: {
			auth: false,
			pageName:'',
			breadcrumb: {
				title: '',
				skip: true
			}
		},
		beforeEnter: checkEntrance,
		children: [
			{
				path: '',
				redirect: 'step1'
			},
			{
				path: 'step1',
				name: 'forgot-step1',
				component: Forgot_Step1,
				meta: {
					auth: false,
					pageName: '忘記密碼',
					breadcrumb: {
						title: '忘記密碼',
						skip: false
					}
				}
			},
			{
				path: 'step2',
				name: 'forgot-step2',
				component: Forgot_Step2,
				meta: {
					auth: false,
					pageName: '忘記密碼(簡訊驗證)',
					breadcrumb: {
						title: '忘記密碼(簡訊驗證)',
						skip: false
					}
				}
			},
			{
				path: 'step3',
				name: 'forgot-step3',
				component: Forgot_Step3,
				meta: {
					auth: false,
					pageName: '重設密碼',
					breadcrumb: {
						title: '重設密碼',
						skip: false
					}
				}
			},
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