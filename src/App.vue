<template>
   <div id="app">
		<vue-progress-bar></vue-progress-bar>
		<Header></Header>
		<Breadcrumb></Breadcrumb>
		<component :is="layoutName">
			<router-view></router-view>
		</component>
		<Footer></Footer>
	</div>
</template>

<script>
import { computed, onMounted } from '@vue/composition-api'
import Header from '@/component/Header/index.vue'
import Footer from '@/component/Footer/index.vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
export default {
	name: 'App',
	components: { Header, Footer, Breadcrumb },
	metaInfo: {
      title: 'reve-cafe',
      titleTemplate: '%s | 黑浮咖啡'
   },
	setup(props, { root }) {
		let isLogin = computed(() => root.$store.getters['auth/isLogin']);
		let layoutName = computed(() => root.$route.meta.layout);

		onMounted(() => {
			if (isLogin.value) root.$store.dispatch('cart/getAllCart');
		});

		return { layoutName }
	}
};
</script>

<style lang="scss">

</style>
