<template src="./html/step1.html"></template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { createFormList, createZipcode } from '@/composition-api/index.js';
export default {
   name: 'register-step1',
   metaInfo () {
      return {
        title: '加入會員',
      }
   },
   setup(props, { root }) {
      let { genderList, questionList } = createFormList();
      let { addressInfo, cityList, districtList } = createZipcode();
      let user = reactive({ mobile: '', password: '', confirm_password: '', name: '', gender: '',security_question: '', security_answer: '', isAgree: false, email: '', birthday: '', road: ''
      });
      let form = ref(null);

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
      }


      return { genderList, questionList, user, addressInfo, cityList, districtList, submitHandler, form }
   }
}
</script>

<style lang="scss" scoped>
.outline-block {
   .form-row {
      &.divide-line {
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