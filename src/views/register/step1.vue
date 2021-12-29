<template src="./html/step1.html"></template>

<script>
import { ref, reactive, onBeforeUnmount } from '@vue/composition-api'
import { formList } from '@/composition-api/formList.js';
export default {
   name: 'register-step1',
   metaInfo () {
      return {
        title: '加入會員',
      }
   },
   setup(props, { root }) {
      let { genderList, questionList } = formList();
      let user = reactive({ mobile: '', password: '', confirm_password: '', name: '', gender: '',security_question: '', security_answer: '', isAgree: false, email: '', birthday: '', address: ''
      });

      return { genderList, questionList, user }
   }
}
</script>

<style lang="scss" scoped>
.outline-block {
   .form-row {
      &.divide-line {
         // height: 1px;
         border-top: 1px solid map-get($borderColor, outer);
      }
      >.form-title {
         flex: 0 0 200px;
         padding-right: 15px;
         font-weight: bold;
         text-align: right;
      }
      >.form-content {
         flex: 0 0 300px;
      }
   }
   .btnBox {
      >button {
         width: 200px;
      }
   }
}
</style>