import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js'
import { authPlugin } from './plugins/auth.js'
import { cartStore } from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	state: {
		showAuthPopup: false
	},
	mutations: {
		setAuthPopup(state, payload) {
			state.showAuthPopup = payload;
		}
	},
	actions: {
		
	},
	modules: {
		auth: authStore,
		cart: cartStore
	},
	plugins: [authPlugin]
})
