<template>
   <div id="app">
		<!-- <vue-progress-bar></vue-progress-bar> -->
		<Header></Header>
		<section>
			<div class="my-container">
				<router-view></router-view>
			</div>
		</section>
		<!-- <Footer></Footer> -->
	</div>
</template>

<script>
import Header from '@/component/Header/index.vue';
import Footer from '@/component/Footer/index.vue';
import { wm_aes } from '@/plugins/crypto/index.js';
export default {
	name: 'App',
	components: {
		Header,
		Footer
	},
	metaInfo: {
      title: 'reve-cafe',
      titleTemplate: '%s | reve-cafe'
   },
	computed: {
		layout() {
			return this.$route.meta.layout || 'default';
		}
	},
	methods: {
		async logout() {
			// let logoutResponse = await this.$store.dispatch('auth/login', {
			// 	account: wm_aes("0986104667"),
    		// 	password: wm_aes("abc123")
			// })
			// let logoutResponse = await this.$store.dispatch('auth/checkLoginStatus')
			// console.log(logoutResponse);
		}
	},
   mounted() {
		
	}
};
</script>

<style lang="scss">

</style>
