import Vue from 'vue'
import Vuex from 'vuex'
import { authStore, cartStore } from './modules/index.js'
import { authPlugin } from './plugins/auth.js'

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
