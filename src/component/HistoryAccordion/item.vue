<template>
   <div class="accordion-item">
      <div class="accordion-header">
         <div>訂單編號 {{ detail.vOrderNum }}</div>
         <div class="toggle-block" @click="triggerHandler">
            詳細內容 <i class="far fa-chevron-down" :class="{rotate:isOpen}"></i>
         </div>
      </div>
      <div class="accordion-body">
         <div class="top-block">
            <div class="title">購買時間</div>
            <div class="content">{{ detail.iCreateTime }}</div>
            <div class="title">貨運編號</div>
            <div class="content">{{  }}</div>
            <div class="title">發票訊息</div>
            <div class="content">{{ invoiceTitle }}-{{ invoiceValue }}</div>
            <div class="title">訂單狀態</div>
            <div class="content">{{ detail.vStatusMessage }}</div>
            <div class="title">付款方式</div>
            <div class="content">{{ detail.info.vPayType }}</div>
            <div class="title">付款狀態</div>
            <div class="content">{{ detail.vPayStatusMessage }}</div>
         </div>
         <div class="bottom-block" :class="{show:isOpen}">
            <div class="picked-cart-outer history">
               <table class="picked-cart-table history">
                  <thead>
                     <tr>
                        <th>商品品項</th>
                        <th width="140">數量</th>
                        <th width="140">單價</th>
                        <th width="140">總價</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="item in cartList.data" :key="item.iId" :is="item.componentName" :info="item"></tr>
                  </tbody>
               </table>
            </div>
            <div class="orderInfo">
               <p>詳細訂購資訊：</p>
               <div class="content">
                  <p class="text-input">收件人資訊：{{ detail.addressee_2.vName }}</p>
                  <p class="text-input">手機號碼：{{ detail.addressee_2.vContact }}</p>
                  <p class="text-input">運送方式：{{ detail.shipping.vShipmentType }}</p>
                  <p class="text-input">超商地址：{{ storeName }}</p>
                  <p class="text-input">收件人地址：242新北市新莊區中正路</p>
                  <p class="text-input">商品金額：${{ detail.iOrderTotal | currency }}</p>
                  <p class="text-input">運費：${{ detail.iShipmentFee | currency }}</p>
                  <p class="text-input">點數折抵：{{ detail.iCoinTotal }}點</p>
                  <p class="text-input">總金額：${{ detail.iMoneyTotal | currency }}</p>
                  <p class="text-input">備註：{{ detail.addressee_2.vRemarks }}</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref, reactive, computed, toRefs, onMounted } from '@vue/composition-api'
import { createCartInfo } from '@/composition-api/index.js'
import NormalDetailRow from '@/component/CartTableRow/normal-detail-row.vue'
import ActivityDetailRow from '@/component/CartTableRow/activity-detail-row.vue'
import MatchDetailRow from '@/component/CartTableRow/match-detail-row.vue'
export default {
   components: { NormalDetailRow, ActivityDetailRow, MatchDetailRow },
   props: {
      accordion: { type: Object, required: true },
      invoiceList: { type: Array, required: true }
   },
   setup(props, { emit }) {
      let { accordion, invoiceList } = toRefs(props);
      let { invoiceMappingKey, processNormalProduct, processActivityProduct } = createCartInfo();
      let isOpen = ref(false);
      let cartList = reactive({ data: []});

      let invoiceTitle = computed(() => {
         let obj = invoiceList.value.find(item => item.value === accordion.value.info.iInvoiceType);
         if (obj !== undefined) return obj.text;
         else return '';
      });

      let invoiceValue = computed(() => {
         let key = invoiceMappingKey[accordion.value.info.iInvoiceType];
         return accordion.value.info[key] || '';
      });

      let storeName = computed(() => {
         if (accordion.value.cvs_com === null) return '';
         let text = '';
         for (let key in accordion.value.cvs_com) {
            text += accordion.value.cvs_com[key];
         }
         return text;
      });

      let triggerHandler = (evt) => {
         isOpen.value = !isOpen.value;
         let headerHeight = document.querySelector('header').offsetHeight;
         let elementPos = evt.currentTarget.offsetTop;
         if (!isOpen.value) return;
         setTimeout(() => {
            window.scrollTo(0, elementPos - headerHeight - 30);
         }, 0);
      }

      onMounted(() => {
         let normalCart = processNormalProduct(accordion.value.meta);
         let activityCart = processActivityProduct(accordion.value.activity_product_promotions_meta_bundle);
         cartList.data = normalCart.concat(activityCart);
      });


      return { detail:accordion, isOpen, cartList, invoiceTitle, invoiceValue, storeName, triggerHandler }
   }
}
</script>

<style lang="scss" scoped>
.accordion-item {
   @include elGutter(margin-bottom, 20px);
}
.accordion-header {
   @extend %bwtFlex;
   padding: 10px 15px;
   background-color: #8C8276;
   color: #fff;
   .toggle-block {
      cursor: pointer;
      user-select: none;
      .fa-chevron-down {
         font-size: 14px;
         &.rotate {
            transform: rotate(-180deg);
         }
      }
   }
}
.accordion-body {
   padding: 15px 0px 0px;
   border: 1px solid map-get($borderColor, primary);
   >.top-block {
      display: flex;
      flex-wrap: wrap;
      font-size: 15px;
      >.title {
         flex: 0 0 20%;
         margin-bottom: 12px;
         padding: 0 15px;
      }
      >.content {
         width: 30%;
         padding: 0 15px;
         margin-bottom: 12px;
         text-align: right;
         color: map-get($fontColor, input)
      }
   }
   >.bottom-block {
      display: none;
      padding: 15px;
      border: 1px dashed map-get($borderColor, divide);
      &.show {
         display: block;
      }
      >.orderInfo {
         >.content {
            margin-top: 8px;
            >.text-input {
               @include elGutter(margin-bottom, 8px);
               font-size: 15px;
            }
         }
      }
   }
}
</style>