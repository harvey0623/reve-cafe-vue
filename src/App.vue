<template>
   <div id="app">
		<div class="mycontainer">test</div>
	</div>
</template>

<script>
import { thirdPartyApi, thirdPartyAuthApi } from '@/assets/api/index.js';
import { wm_aes } from '@/assets/crypto/index.js';
export default {
   async mounted() {
		thirdPartyAuthApi.login({
			account: wm_aes('0986104667'),
    		password: wm_aes('abc123'),
		}).then(res => {
			console.log(res)
		})
	}
};
</script>

<style lang="scss"></style>
