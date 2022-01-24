<template src="./html/redwithgreen.html"></template>

<script>
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { activityApi, activityCartApi } from '@/api/index.js'
import MarkItem from '@/component/MarkItem/index.vue'
export default {
   name: 'redwithgreen',
   components: { MarkItem },
   metaInfo () {
      return {
        title: '紅配綠活動',
      }
   },
   setup(props, { root }) {
      let isLoading = ref(false);
      let productList = reactive({ data: [] });
      let pickedList = reactive({ data: [] });
      let cartMessage = ref('');
      let markType = ref('all');
      let cartModal = ref(null);
      let markList = reactive({ 
         all: { title: '全部', fontColor: '#BC9F75', borderColor: '#BC9F75', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#BC9F75' },
         red: { title: '紅標', fontColor: '#FF0000', borderColor: '#FF0000', backgroundColor: '#fff', hoverFontColor: '#fff',hoverBackgroundColor: '#FF0000' },
         green: { title: '綠標',  fontColor: '#04a978', borderColor: '#04a978', backgroundColor: '#fff', hoverFontColor: '#fff', hoverBackgroundColor: '#04a978' },
      });
      let activityId = computed(() => root.$store.state.activity.activityInfo.id);
      let criteria = computed(() => root.$store.getters['activity/criteria']);

      let changeMarkType = (payload) => {
         markType.value = payload;
      }

      onMounted(() => {
         
      })

      return { isLoading, productList, pickedList, cartMessage, activityId, criteria, cartModal,markType, markList, changeMarkType }
   }
}
</script>

<style lang="scss">
.mark-block {
   display: flex;
   align-items: center;
   margin-bottom: 20px;
}
</style>