<template>
   <div id="app">
		<Header></Header>
		<Breadcrumb></Breadcrumb>
		<section>
			<div class="my-container">
				<PageName></PageName>
				<router-view></router-view>
			</div>
		</section>
		<modal-message ref="doLoginModal" @confirm="redirectHandler">
         <p>請重新登入</p>
      </modal-message>
	</div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import Header from '@/component/Header/index.vue'
import Footer from '@/component/Footer/index.vue'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import PageName from '@/component/PageName/index.vue'
export default {
	name: 'App',
	components: {
		Header,
		Footer,
		Breadcrumb,
		PageName
	},
	metaInfo: {
      title: 'reve-cafe',
      titleTemplate: '%s | reve-cafe'
   },
	setup(props, { root }) {
		let doLoginModal = ref(null);
		let showAuthPopup = computed(() => root.$store.state.showAuthPopup);
		let redirectHandler = () => {
			doLoginModal.value.closeModal();
			root.$router.replace('/signin');
		}

		watch(showAuthPopup, (val) => {
			console.log(val)
		});

		return { redirectHandler, doLoginModal }
	}
};
</script>

<style lang="scss">

</style>
