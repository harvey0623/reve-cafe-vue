import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import { checkEntrance } from './middleware/checkEntrance.js'
import TempView from '@/views/tempView/index.vue'
import Home from '@/views/home/index.vue'
import Signin from '@/views/signin/index.vue'
import Register_Step1 from '@/views/register/step1.vue'
import Register_Step2 from '@/views/register/step2.vue'
import Forgot_Step1 from '@/views/forgot/step1.vue'
import Forgot_Step2 from '@/views/forgot/step2.vue'
import Forgot_Step3 from '@/views/forgot/step3.vue'
import ProductDetail from '@/views/product/detail.vue'
import ProductCategory from '@/views/product/category.vue'
import Activity from '@/views/activity/index.vue'
import Quanity from '@/views/activity/quanity.vue'
import Quota from '@/views/activity/quota.vue'
import RedWithGreen from '@/views/activity/red_with_green.vue'
import Term from '@/views/term/index.vue'
import Brand from '@/views/brand/index.vue'
import Contact from '@/views/contact/index.vue'
import Faq from '@/views/faq/index.vue'
import Member from '@/views/member/index.vue'
import Profile from '@/views/member/profile.vue'
import orderHistory from '@/views/member/order.vue'
import pointHistory from '@/views/member/point.vue'
import CartStep1 from '@/views/cart/step1.vue'
import CartStep2 from '@/views/cart/step2.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			auth: false,
			layout: 'home-layout',
			pageName: {
				title: '',
				show: false
			},
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
			layout: 'page-layout',
			pageName: {
				title: '登入',
				show: true
			},
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
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
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
					layout: 'page-layout',
					pageName: {
						title: '加入會員',
						show: true
					},
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
					layout: 'page-layout',
					pageName: {
						title: '帳號驗證',
						show: true
					},
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
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
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
					layout: 'page-layout',
					pageName: {
						title: '忘記密碼',
						show: true
					},
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
					layout: 'page-layout',
					pageName: {
						title: '忘記密碼(簡訊驗證)',
						show: true
					},
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
					layout: 'page-layout',
					pageName: {
						title: '重設密碼',
						show: true
					},
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
		component: Member,
		meta: {
			auth: true,
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
			breadcrumb: {
				title: '會員中心',
				skip: false
			}
		},
		children: [
			{
				path: '',
				redirect: 'profile'
			},
			{
				path: 'profile',
				name: 'profile',
				component: Profile,
				meta: {
					auth: true,
					layout: 'page-layout',
					pageName: {
						title: '會員資料',
						show: true
					},
					breadcrumb: {
						title: '會員資料',
						skip: false
					}
				},
			},
			{
				path: 'order',
				name: 'order',
				component: orderHistory,
				meta: {
					auth: true,
					layout: 'page-layout',
					pageName: {
						title: '訂單紀錄',
						show: true
					},
					breadcrumb: {
						title: '訂單紀錄',
						skip: false
					}
				},
			},
			{
				path: 'point',
				name: 'point',
				component: pointHistory,
				meta: {
					auth: true,
					layout: 'page-layout',
					pageName: {
						title: '點數紀錄',
						show: true
					},
					breadcrumb: {
						title: '點數紀錄',
						skip: false
					}
				},
			}
		]
	},
	{
		path: '/cart',
		component: TempView,
		meta: {
			auth: true,
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
			breadcrumb: {
				title: '購物車',
				skip: false
			}
		},
		children: [
			{
				path: '',
				redirect: 'step1'
			},
			{
				path: 'step1',
				name: 'cart-step1',
				component: CartStep1,
				meta: {
					auth: true,
					layout: 'page-layout',
					pageName: {
						title: '購物車-step1',
						show: true
					},
					breadcrumb: {
						title: 'step1',
						skip: false
					}
				},
			},
			{
				path: 'step2',
				name: 'cart-step2',
				component: CartStep2,
				meta: {
					auth: true,
					layout: 'page-layout',
					pageName: {
						title: '購物車-step2',
						show: true
					},
					breadcrumb: {
						title: 'step2',
						skip: false
					}
				},
			},
		]
	},
	{
		path: '/product',
		component: TempView,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
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
				path: 'detail/:productCode',
				name: 'product_detail',
				component: ProductDetail,
				meta: {
					auth: false,
					layout: 'page-layout',
					needBackToSingin: true,
					pageName: {
						title: '商品詳情',
						show: false
					},
					breadcrumb: {
						title: '商品詳情',
						skip: false
					}
				},
			},
			{
				path: 'category',
				name: 'product_category',
				component: ProductCategory,
				meta: {
					auth: false,
					layout: 'page-layout',
					pageName: {
						title: '商品分類',
						show: false
					},
					breadcrumb: {
						title: '商品分類',
						skip: false
					}
				},
			}
		]
	},
	{
		path: '/activity',
		component: Activity,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
			breadcrumb: {
				title: '優惠活動',
				skip: false
			}
		},
		children: [
			{
				path: '',
				redirect: '/'
			},
			{
				path: 'quota',
				name: 'quota',
				component: Quota,
				meta: {
					auth: false,
					layout: 'page-layout',
					needBackToSingin: true,
					pageName: {
						title: '滿額活動',
						show: true
					},
					breadcrumb: {
						title: '滿額活動',
						skip: false
					}
				},
			},
			{
				path: 'quanity',
				name: 'quanity',
				component: Quanity,
				meta: {
					auth: false,
					layout: 'page-layout',
					needBackToSingin: true,
					pageName: {
						title: '滿件活動',
						show: true
					},
					breadcrumb: {
						title: '滿件活動',
						skip: false
					}
				},
			},
			{
				path: 'redwithgreen',
				name: 'redwithgreen',
				component: RedWithGreen,
				meta: {
					auth: false,
					layout: 'page-layout',
					needBackToSingin: true,
					pageName: {
						title: '紅配綠活動',
						show: true
					},
					breadcrumb: {
						title: '紅配綠活動',
						skip: false
					}
				},
			}
		]
	},
	{
		path: '/term',
		name: 'term',
		component: Term,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '',
				show: false
			},
			breadcrumb: {
				title: '條款',
				skip: false
			},
		}
	},
	{
		path: '/brand',
		name: 'brand',
		component: Brand,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '品牌介紹',
				show: true
			},
			breadcrumb: {
				title: '品牌介紹',
				skip: false
			},
		}
	},
	{
		path: '/faq',
		name: 'faq',
		component: Faq,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '常見問題',
				show: true
			},
			breadcrumb: {
				title: '常見問題',
				skip: false
			},
		}
	},
	{
		path: '/contact',
		name: 'contact',
		component: Contact,
		meta: {
			auth: false,
			layout: 'page-layout',
			pageName: {
				title: '聯絡我們',
				show: true
			},
			breadcrumb: {
				title: '聯絡我們',
				skip: false
			},
		}
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