<template>
   <div class="activity-menu">
      <MenuItem v-for="(item,index) in activityList" :key="index" :menuInfo="item"></MenuItem>
   </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'
import MenuItem from './MenuItem.vue'
export default {
   components: { MenuItem },
   setup(props, { root }) {
      let $store = root.$store;

      let activityList = computed(() => {
         if ($store.state.activity === undefined) return [];
         else return $store.state.activity.activityList;
      });
      
      return { activityList }
   }
}
</script>

<style lang="scss">

</style>