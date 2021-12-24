<template>
   <div id="app">
		<Header></Header>
		<Breadcrumb></Breadcrumb>
		<section>
			<div class="my-container">
				<router-view></router-view>
			</div>
		</section>
	</div>
</template>

<script>
import Header from '@/component/Header/index.vue';
import Footer from '@/component/Footer/index.vue';
import Breadcrumb from '@/component/Breadcrumb/index.vue';
export default {
	name: 'App',
	components: {
		Header,
		Footer,
		Breadcrumb
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
   mounted() {
		
	}
};
</script>

<style lang="scss">

</style>
