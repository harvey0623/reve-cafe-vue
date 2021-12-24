<template>
   <div class="bread-item" :class="{active: isActive}">
      <router-link :to="breadItem.path">{{ linkText }}</router-link>
   </div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      breadTotal: {
         type: Number,
         required: true
      },
      breadItem: {
         type: Object,
         required: true
      },
      order: {
         type: Number,
         required: true
      }
   },
   setup(props) {
      let { breadTotal, breadItem, order } = toRefs(props);
      let linkText = computed(() => {
         let breadTitle = breadItem.value.meta.breadcrumb.title;
         return order.value !== breadTotal.value - 1 ? `${breadTitle}  /` : breadTitle;
      });
      let isActive = computed(() => order.value === breadTotal.value - 1);

      return { linkText, isActive }
   }
}
</script>

<style>

</style>