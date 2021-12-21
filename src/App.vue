<template>
   <div id="app">
		<div class="mycontainer">test</div>
	</div>
</template>

<script>
import { thirdPartyApi } from '@/assets/api/index.js';
export default {
   mounted() {
		thirdPartyApi.getTerm().then(res => {
			console.log(res)
		})
	}
};
</script>

<style lang="scss"></style>
