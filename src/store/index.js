import Vue from 'vue'
import Vuex from 'vuex'
import { authStore, cartStore } from './modules/index.js'
import { authPlugin } from './plugins/auth.js'
import { thirdPartyApi } from '@/api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	state: {
		termList: []
	},
	mutations: {
		setTermList(state, payload) {
			state.termList = payload;
		}
	},
	actions: {
		async getTerm({ commit }) {
			let termResponse = await thirdPartyApi.getTerm({ type: ['register'] });
			if (termResponse.results.term_information.length === 0) return;
			commit('setTermList', termResponse.results.term_information[0].terms);
		}
	},
	modules: {
		auth: authStore,
		cart: cartStore
	},
	plugins: [authPlugin]
})
