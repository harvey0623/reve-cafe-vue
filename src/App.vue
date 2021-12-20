<template>
   <div id="app">
		<div class="mycontainer">test</div>
	</div>
</template>

<script>
import { termApi } from '@/assets/api/index.js';
export default {
   mounted() {
		termApi.getTerm({ type: [ "register"] }).then(res => {
			console.log(res)
		})
	}
};
</script>

<style lang="scss"></style>
