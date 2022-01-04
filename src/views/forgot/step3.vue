<template src="./html/step3.html"></template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { thirdPartyAuthApi } from '@/api/index.js'
import { wm_aes } from '@/plugins/crypto/index.js';
import { storageObj } from '@/plugins/storage/index.js'
export default {
   name: 'forgot-step3',
   metaInfo () {
      return {
        title: '重設密碼',
      }
   },
   setup(props, { root }) {
      let form = ref(null);
      let user = reactive({ password: '', confirm_password: '', tempToken: '' });
      let tipInfo = reactive({ status: 0, message: '', type: '' });
      let isLoading = ref(false);
      let checkModal = ref(null);

      let checkAndSetStep1Data = () => {
         let step1Data = storageObj.getSessionItem('forgot');
         if (step1Data === null) {
            tipInfo.message = '請重新填寫表單';
            tipInfo.type = 'check';
            checkModal.value.openModal();
            return;
         }
         user.tempToken = step1Data.tempToken;
      }

      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let resetResponse = await thirdPartyAuthApi.reset_password({
            temp_access_token: user.tempToken,
            new_password: wm_aes(user.password),
            confirm_password: wm_aes(user.confirm_password),
         });
         tipInfo.status = resetResponse.status;
         tipInfo.message = resetResponse.message;
         tipInfo.type = 'reset';
         checkModal.value.openModal();
         isLoading.value = false;
      }

      let confirmHandler = () => {
         if (tipInfo.type === 'check') return root.$router.push('/forgot/step1');
         let { status } = tipInfo;
         if (status === 0) {
            checkModal.value.closeModal();
         } else if (status === 1) {
            storageObj.removeSessionItem('forgot');
            root.$router.push('/signin');
         } else if (status === 2) {
            storageObj.removeSessionItem('forgot');
            root.$router.push('/forgot/step1');
         }
      }

      onMounted(() => {
         checkAndSetStep1Data();
      });

      return { form, user, submitHandler, isLoading, confirmHandler, checkModal, tipInfo }
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
         margin-top: 30px;
         >button {
            width: 200px;
         }
      }
   }
}
</style>