<template>
   <div class="activity-block">
      <div class="activity-left">
         <ActivityMenu></ActivityMenu>
      </div>
      <div class="activity-right">
         <div class="banner" :style="{backgroundImage: `url(${bannerUrl})`}"></div>
         <router-view></router-view>
      </div>
      <modal-message ref="emptyModal" @confirm="emptyHandler">
         <p>{{ emptyMsg }}</p>
      </modal-message>
   </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { activityStore } from '@/store/modules/activity.js'
import ActivityMenu from '@/component/ActivityMenu/index.vue'
import FullAmountRow from '@/component/ActivityMenu/index.vue'
export default {
   components: { ActivityMenu, FullAmountRow },
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
      let bannerUrl = ref('');
      
      let bannerImage = computed(() => {
         if ($store.getters['activity/bannerImage'] === undefined) return '';
         return $store.getters['activity/bannerImage'];
      });

      let emptyHandler = () => root.$router.replace('/');
      let getHasStoreModule = (name) => $store.hasModule(name);

      let setStoreActivityInfo = (payload) => {
         $store.commit('activity/setActivtyInfo', { id: parseInt(payload.id), type: payload.type });
      }

      let preloadBannerImage = (imgUrl) => {
         let img = new Image();
         img.onload = () => bannerUrl.value = imgUrl;
         img.src = imgUrl;
      }

      let initStore = async() => {
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
      }

      initStore();

      watch(() => root.$route, (val) => {
         setStoreActivityInfo({ id: val.query.activityId, type: val.query.activityType });
      });

      watch(bannerImage, (val) => {
         preloadBannerImage(val);
      });

      onBeforeUnmount(() => {
         let hasActivityStore = getHasStoreModule('activity');
         if (hasActivityStore) $store.unregisterModule('activity');
      });

      return { emptyModal, emptyHandler, emptyMsg, bannerUrl }

   }
}
</script>

<style lang="scss" scoped>
.activity-block {
   display: flex;
   align-items: flex-start;
   >.activity-left {
      flex: 0 0 220px;
      position: sticky;
      position: -webkit-sticky;
      top: 160px;
   }
   >.activity-right {
      flex: 1;
      padding-left: 50px;
      >.banner {
         height: 250px;
         margin-bottom: 50px;
         background-position: center center;
         background-size: cover;
      }
   }
}
</style>