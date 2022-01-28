<template>
   <div class="member-block">
      <div class="content-block">
         <div class="left">
            <MemberMenu @logout="doubleCheck"></MemberMenu>
         </div>
         <div class="right">
            <router-view @loading="setLoading"></router-view>
         </div>
      </div>
      <Loading v-show="isLoading"></Loading>
      <modal-message ref="logoutModal" :showCancel="true" @confirm="logoutHandler">
         <p>是否要登出?</p>
      </modal-message>
   </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import MemberMenu from '@/component/MemberMenu/index.vue'
export default {
   components: { MemberMenu },
   setup(props, { root }) {
      let logoutModal = ref(null);
      let isLoading = ref(false);

      let doubleCheck = () => logoutModal.value.openModal();

      let setLoading = (val) => isLoading.value = val;

      let logoutHandler = async() => {
         logoutModal.value.closeModal();
         isLoading.value = true;
         let response = await root.$store.dispatch('auth/logout');
         if (response.status === 1) root.$router.replace('/');
         isLoading.value = false;
      }

      return { logoutModal, isLoading, logoutHandler, doubleCheck, setLoading }
   }
}
</script>

<style lang="scss" scoped>
.content-block {
   display: flex;
   align-items: flex-start;
   >.left {
      flex: 0 0 200px;
   }
   >.right {
      flex: 1;
      padding-left: 50px;
   }
}
</style>