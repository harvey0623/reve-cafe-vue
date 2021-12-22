<template>
   <div id="app">
		<div class="mycontainer">
			<button @click="logout">login</button>
		</div>
	</div>
</template>

<script>
import { wm_aes } from '@/plugins/crypto/index.js';
export default {
	methods: {
		async logout() {
			let logoutResponse = await this.$store.dispatch('auth/login', {
				account: wm_aes("0986104667"),
    			password: wm_aes("abc123")
			})
			console.log(logoutResponse);
		}
	},
   async mounted() {
	
	}
};
</script>

<style lang="scss"></style>
