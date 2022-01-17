<template src="./html/category.html"></template>

<script>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api'
import { productApi } from '@/api/index.js'
import { createMultipleSpec } from '@/composition-api/index.js'
import CategoryItem from '@/component/CategoryItem/index.vue'
import MultipleSpecItem from '@/component/Product/MultipleSpecItem.vue'
export default {
   name: 'product-category',
   components: { CategoryItem, MultipleSpecItem },
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
      let keyword = ref('');
      let paginationInfo = reactive({ current: 0, next: 1, total: 0 });
      let productList = reactive({ data: [] });
      let { processProduct } = createMultipleSpec();
      let loadMore = ref(false);

      let categoryName = computed(() => {
         let obj = mainCategory.data.find(item => item.iId === queryId.value);
         if (obj !== undefined) return obj.vCategoryName;
         else return '';
      });

      let hasNextPage = computed(() => paginationInfo.next <= paginationInfo.total);
      let totalProduct = computed(() => productList.data.length);
      let buttonText = computed(() => loadMore.value ? '載入中...' : '顯示更多');

      let setCategory = async() => {
         let [ mainInfo, subInfo ] = await Promise.all([
            productApi.product_category({ category_ids: '' }),
            productApi.product_category({ category_ids: queryId.value }),
         ]);
         mainCategory.data = mainInfo.aaData;
         subCategory.data = subInfo.aaData;
         categoryId.value = subCategory.data.length > 0 ? subCategory.data[0].iId : 0;
      }

      let changeCategory = (id) => {
         categoryId.value = id;
         searchHandler();
      }

      let gatherProductParams = (pageNumber) => {
         return { 
            category_ids: categoryId.value,
            keyword: keyword.value,
            page: pageNumber !== undefined ? pageNumber : paginationInfo.next
         }
      }

      let setPaginationInfo = (payload) => {
         let { current_page, total_pages } = payload;
         paginationInfo.current = current_page;
         paginationInfo.next = current_page + 1;
         paginationInfo.total = total_pages;
      }

      let getPagination = async(isPag, pageNumber) => {
         let params = gatherProductParams(pageNumber);
         let productInfo = await productApi.product(params);
         let lists = processProduct(productInfo.aaData, 20);
         if (isPag) productList.data = productList.data.concat(lists);
         else productList.data = lists;
         setPaginationInfo(productInfo);
      }

      let searchHandler = async() => {
         isLoading.value = true;
         loadMore.value = false;
         await getPagination(false, 1);
         window.scrollTo(0, 0);
         isLoading.value = false;
      }

      let seeMore = async() => {
         loadMore.value = true;
         await getPagination(true);
         loadMore.value = false;
      }

      onMounted(async() => {
         isLoading.value = true;
         queryId.value = parseInt(root.$route.query.categoryId);
         await setCategory();
         await getPagination(false, 1);
         isLoading.value = false;
      });

      watch(() => root.$route, async(val) => {
         isLoading.value = true;
         queryId.value = parseInt(root.$route.query.categoryId);
         loadMore.value = false;
         keyword.value = '';
         await setCategory();
         await getPagination(false, 1);
         isLoading.value = false;
      });

      return { isLoading, categoryName, categoryId, subCategory, changeCategory, keyword, hasNextPage, searchHandler, productList, totalProduct, seeMore, paginationInfo, buttonText }
   }
}
</script>

<style src="./scss/category.scss" lang="scss" scoped></style>