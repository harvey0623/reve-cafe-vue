<template>
   <div class="activity-block">
      <div class="activity-left">
         <ActivityMenu></ActivityMenu>
      </div>
      <div class="activity-right">
         <router-view></router-view>
      </div>
      <modal-message ref="emptyModal" @confirm="emptyHandler">
         <p>{{ emptyMsg }}</p>
      </modal-message>
   </div>
</template>

<script>
import { ref, watch, onBeforeMount, onBeforeUnmount } from '@vue/composition-api'
import { activityStore } from '@/store/modules/activity.js'
import ActivityMenu from '@/component/ActivityMenu/index.vue'
export default {
   components: { ActivityMenu },
   metaInfo () {
      return {
        title: '優惠活動',
      }
   },
   setup(props, { root }) {
      let $store = root.$store;
      let $route = root.$route;
      let emptyModal = ref(null);
      let emptyMsg = ref('');
      let emptyHandler = () => root.$router.replace('/');
      let getHasStoreModule = (name) => $store.hasModule(name);

      let setStoreActivityInfo = (payload) => {
         $store.commit('activity/setActivtyInfo', { id: parseInt(payload.id), type: payload.type });
      }
      
      onBeforeMount(async() => {
         let hasActivityStore = getHasStoreModule('activity');
         if (hasActivityStore) return;
         $store.registerModule('activity', activityStore);
         setStoreActivityInfo({ id: $route.query.activityId, type: $route.query.activityType });
         let { status, message } = await $store.dispatch('activity/getActivity');
         if (status === 0) {
            emptyMsg.value = message;
            emptyModal.value.openModal();
            return;
         }
      });

      onBeforeUnmount(() => {
         let hasActivityStore = getHasStoreModule('activity');
         if (hasActivityStore) $store.unregisterModule('activity');
      });

      watch(() => root.$route, (val) => {
         setStoreActivityInfo({ id: val.query.activityId, type: val.query.activityType });
      });

      return { emptyModal, emptyHandler, emptyMsg }
   }
}
</script>

<style lang="scss" scoped>
.activity-block {
   display: flex;
   align-items: flex-start;
   >.activity-left {
      flex: 0 0 220px;
   }
   >.activity-right {
      flex: 1;
      padding-left: 30px;
   }
}
</style>