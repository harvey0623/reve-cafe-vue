<template>
   <div class="">
      
   </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from '@vue/composition-api'
export default {
   metaInfo () {
      return {
        title: '滿額活動',
      }
   },
   setup(props, { root }) {

      onBeforeMount(() => {
         // let activityId = parseInt(root.$route.query.activityId);
         // root.$store.commit('activity/setActivityId', activityId);
      });

      // watch(() => root.$route, (val) => {
      //    console.log(val)
      // })

      return {}
   }
}
</script>

<style>

</style>