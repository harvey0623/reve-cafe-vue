<template>
   <div class="category-item" :class="{active:isActive}" @click="clickHandler">
      <p class="name">{{ info.vCategoryName }}</p>
      <p class="summary text-input">{{ info.vCategorySecondName }}</p>
   </div>
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
export default {
   props: {
      info: { type: Object, required: true },
      categoryId: { type: Number, required: true }
   },
   setup(props, { emit }) {
      let isActive = computed(() => props.info.iId === props.categoryId);

      let clickHandler = () => {
         emit('changeCategory', props.info.iId);
      }

      return { ...toRefs(props.info), isActive, clickHandler }
   }
}
</script>

<style lang="scss" socped>
.category-item {
   position: relative;
   padding-bottom: 5px;
   @include elGutter(margin-bottom, 20px);
   cursor: pointer;
   &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      @include size(0, 2px);
      background-color: map-get($elBgColor, primary);
      transition: width 0.25s;
   }
   &.active,
   &:hover {
      &:after {
         width: 100%;
      }
   }
   >.name {
      margin-bottom: 5px;
      font-size: 22px;
   }
}
</style>