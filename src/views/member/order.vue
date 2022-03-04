<template src="./html/order.html"></template>

<script>
import dayjs from 'dayjs'
import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { orderApi } from '@/api/index.js'
import HistoryAccordion from '@/component/HistoryAccordion/index.vue'
import EmptyBlock from '@/component/EmptyBlock/index.vue'
export default {
   name: 'order_history',
   components: { HistoryAccordion, EmptyBlock },
   metaInfo () {
      return {
        title: '訂單管理',
      }
   },
   setup(props, { emit }) {
      let datePicker = null;
      let orderNumber = ref('');
      let dateInput = ref(null);
      let accordionBlock = ref(null);
      let orderStatus = reactive({
         id: '0',
         list: { 0: '等待處理', 1: '訂單已完成', 2: '訂單已取消', 3: '處理中' }
      });
      let paginationInfo = reactive({ current: 1, next: 1, total: 0, loading: false });
      let accordionInfo = reactive({ list: [] });

      let hasNextPage = computed(() => paginationInfo.next <= paginationInfo.total);
      let seeMoreButtonText = computed(() => paginationInfo.loading ? '載入中...' : '顯示更多');
      let hasHistory = computed(() => accordionInfo.list.length > 0);

      let initDatePicker = () => {
         let minDate = dayjs().subtract(6, 'month').toDate();
         let maxDate = new Date();
         let beforeMonthDate = dayjs().subtract(1, 'month').toDate();
         datePicker = new flatpickr(dateInput.value, {
            mode: 'range',
            dateFormat: 'Y/m/d',
            minDate,
            maxDate,
            defaultDate: [beforeMonthDate, maxDate],
            locale: { rangeSeparator: '~' }
         });
      }

      let setPaginationInfo = (payload) => {
         paginationInfo.current = payload.current_page;
         paginationInfo.next = payload.current_page + 1;
         paginationInfo.total = payload.total_pages;
      }

      let getOrderHistory = async(isPag, currentPage) => {
         let [ startDate, endDate ] = datePicker.selectedDates;
         let response = await orderApi.order_history({
            create_time_start: dayjs(startDate).format('YYYY-MM-DD'),
            create_time_end: dayjs(endDate).format('YYYY-MM-DD'),
            order_num: orderNumber.value,
            status: orderStatus.id,
            page: currentPage !== undefined ? currentPage : paginationInfo.next
         });
         setPaginationInfo(response);
         if (isPag) accordionInfo.list = accordionInfo.list.concat(response.aaData);
         else accordionInfo.list = response.aaData;
      }

      let closeAllAccordion = () => {
         accordionBlock.value.$refs.accordionItems.forEach(item => item.isOpen = false);
      }

      let seeMore = async() => {
         paginationInfo.loading = true;
         await getOrderHistory(true);
         paginationInfo.loading = false;
      }

      let submitHandler = async() => {
         emit('loading', true);
         await getOrderHistory(false, 1);
         closeAllAccordion();
         emit('loading', false);
      }
      
      onMounted(async() => {
         initDatePicker();
         submitHandler();
      });

      return { accordionBlock, orderNumber, dateInput, orderStatus, paginationInfo, accordionInfo, hasNextPage, hasHistory, seeMoreButtonText, seeMore, submitHandler }
   }
}
</script>

<style lang="scss" scoped>
.criteria-panel {
   display: flex;
   align-items: center;
   margin-bottom: 30px;
   >.form-control {
      flex: 1;
      margin-right: 10px;
   }
   >.btn-primary {
      flex: 0 0 90px;
      height: 38px;
      font-size: 16px;
   }
}
</style>