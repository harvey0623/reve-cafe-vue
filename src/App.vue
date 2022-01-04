<template>
   <div id="app">
		<vue-progress-bar></vue-progress-bar>
		<Header></Header>
		<Breadcrumb></Breadcrumb>
		<section>
			<div class="my-container">
				<PageName></PageName>
				<router-view></router-view>
			</div>
		</section>
	</div>
</template>

<script>
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import Header from '@/component/Header/index.vue'
import Footer from '@/component/Footer/index.vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import PageName from '@/component/PageName/index.vue'
export default {
	name: 'App',
	components: { Header, Footer, Breadcrumb, PageName },
	metaInfo: {
      title: 'reve-cafe',
      titleTemplate: '%s | reve-cafe'
   },
	setup(props, { root }) {
		let isLogin = computed(() => root.$store.getters['auth/isLogin']);

		onMounted(() => {
			if (!isLogin.value) return;
         root.$store.dispatch('cart/getAllCart');
		})

		return {  }
	}
};
</script>

<style lang="scss">

</style>
