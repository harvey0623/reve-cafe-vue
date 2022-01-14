<template src="./html/category.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { productApi } from '@/api/index.js'
import CategoryItem from '@/component/CategoryItem/index.vue'
export default {
   name: 'product-category',
   components: { CategoryItem },
   metaInfo () {
      return {
        title: '商品分類',
      }
   },
   setup(props, { root }) {
      let queryId = ref('');
      let categoryId = ref('');
      let mainCategory = reactive({ data: [] });
      let subCategory = reactive({ data: [] });
      let isLoading = ref(false);

      let categoryName = computed(() => {
         let obj = mainCategory.data.find(item => item.iId === queryId.value);
         if (obj !== undefined) return obj.vCategoryName;
         else return '';
      });

      let setCategory = async() => {
         let [ mainInfo, subInfo ] = await Promise.all([
            productApi.product_category({ category_ids: '' }),
            productApi.product_category({ category_ids: queryId.value }),
         ]);
         mainCategory.data = mainInfo.aaData;
         subCategory.data = subInfo.aaData;
         categoryId.value = subCategory.data[0].iId;
      }

      let changeCategory = (id) => {
         categoryId.value = id;
      }

      onMounted(async() => {
         queryId.value = parseInt(root.$route.query.categoryId);
         await setCategory();

      });

      watch(() => root.$route, async(val) => {
         queryId.value = parseInt(root.$route.query.categoryId);
         await setCategory();
      })

      return { isLoading, categoryName, categoryId, subCategory, changeCategory }
   }
}
</script>

<style src="./scss/category.scss" lang="scss" scoped></style>