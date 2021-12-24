<template>
   <div class="breadcrumb" v-show="showBreadcrumb">
      <div class="my-container">
         <BreadItem
            v-for="(bread,index) in breadList"
            :key="bread.path"
            :breadTotal="breadTotal"
            :breadItem="bread"
            :order="index"
         ></BreadItem>
      </div>
   </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import BreadItem from './BreadItem.vue';
export default {
   components: {
      BreadItem
   },
   setup(props, { root }) {
      let homeRoute = computed(() => {
         return root.$router.options.routes.filter(route => route.name === 'home');
      });
      let matchedRoute = computed(() => {
         return root.$route.matched.filter(route => !route.meta.breadcrumb.skip);
      });
      let breadList = computed(() => homeRoute.value.concat(matchedRoute.value));
      let breadTotal = computed(() => breadList.value.length);
      let showBreadcrumb = computed(() => {
         return breadTotal.value > 1 && root.$route.name !== 'home';
      });

      return { showBreadcrumb, breadTotal, breadList };
   }
}
</script>

<style lang="scss">
.breadcrumb {
   background-color: #f2f2f2;
   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2) inset;
   >.my-container {
      display: flex;
      align-items: center;
      padding-top: 9px;
      padding-bottom: 9px;
   }
}
.bread-item {
   margin-right: 10px;
   &.active {
      >a {
         color: #000;
      }
   }
   >a {
      color: #bcb9b9;
   }
}
</style>