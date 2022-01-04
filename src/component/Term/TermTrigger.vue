<template>
   <p class="term-trigger" @click="triggerHandler">
      <span class="title">「{{ termTitle }}」</span>
      <span class="and" v-show="!isLast">及</span>
   </p>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      termId: {
         type: Number,
         required: true
      },
      termTitle: {
         type: String,
         required: true
      },
      totalTerms: {
         type: Number,
         required: true
      },
      order: {
         type: Number,
         required: true
      }
   },
   setup(props, { emit }) {
      let { termId, totalTerms, order } = toRefs(props);

      let isLast = computed(() => order.value === totalTerms.value - 1);

      let triggerHandler = () => {
         emit('term-trigger', termId.value);
      }

      return { isLast, triggerHandler };
   }
}
</script>

<style lang="scss" scoped>
.term-trigger {
   >.title {
      cursor: pointer;
   }
   >.and {
      margin-left: -1px;
      margin-right: -1px;
   }
}
</style>