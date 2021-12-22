import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js'
import { authPlugin } from './plugins/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	state: {

	},
	mutations: {

	},
	actions: {
		
	},
	modules: {
		auth: authStore
	},
	plugins: [authPlugin]
})
