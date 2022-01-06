<template src="./html/step1.html"></template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { thirdPartyAuthApi } from '@/api/index.js'
import { createFormList } from '@/composition-api/index.js'
import { storageObj, wm_aes } from '@/plugins/index.js'
export default {
   name: 'forgot-step1',
   metaInfo () {
      return {
        title: '忘記密碼',
      }
   },
   setup(props, { root }) {
      let { questionList } = createFormList();
      let form = ref(null);
      let user = reactive({ mobile: '', security_question: '', security_answer: ''});
      let checkInfo = reactive({ status: 0, message: '' });
      let isLoading = ref(false);
      let checkModal = ref(null);

      let saveUserData = (token) => {
         storageObj.setSessionItem('forgot', { user, tempToken: token });
      }

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let forgotResponse = await thirdPartyAuthApi.forgot_password({
            mobile: wm_aes(user.mobile),
            security_question: user.security_question,
            security_answer: user.security_answer
         });
         checkInfo.status = forgotResponse.status;
         checkInfo.message = forgotResponse.message;
         if (forgotResponse.status === 1) saveUserData(forgotResponse.aaData.temp_access_token);
         checkModal.value.openModal();
         isLoading.value = false;
      }

      let confirmHandler = () => {
         if (checkInfo.status === 0) {
            checkModal.value.closeModal();
         } else {
            root.$router.push('/forgot/step2');
         }
      }


      return { questionList, form, user, submitHandler, isLoading, confirmHandler, checkModal, checkInfo }
   }
}
</script>

<style lang="scss" scoped>
.outline-block {
   .form-row {
      .form-title {
         flex: 0 0 200px;
      }
      >.form-content {
         flex: 0 0 300px;
      }
   }
   >.bottom-block {
      padding: 20px 20px;
      >p {
         font-size: 16px;
      }
      >.btnBox {
         >button {
            width: 200px;
         }
      }
   }
}
</style>