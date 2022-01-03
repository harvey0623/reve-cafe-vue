<template>
   <p class="term-trigger" @click="triggerHandler">
      <span>{{ text }}</span>
   </p>
</template>

<script>
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
   computed: {
      text() {
         let isLast = this.order === this.totalTerms - 1;
         return `「${this.termTitle}」${isLast ? '' : '及'}`;
      }
   },
   methods: {
      triggerHandler() {
         this.$emit('term-trigger', this.termId);
      }
   }
}
</script>

<style lang="scss" scoped>
.term-trigger {
   cursor: pointer;
}
</style>