<template src="./html/index.html"></template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { customerApi } from '@/api/index.js'
export default {
   metaInfo () {
      return {
         title: '連絡我們',
      }
   },
   setup(props) {
      let isLoading = ref(false);
      let contactInfo = reactive({ type: '', name: '', email: '', subject: '', content: '' });
      let contactResult = reactive({ message: '' });
      let form = ref(null);
      let contactModal = ref(null);

      let resetHandler = () => {
         for (let key in contactInfo) {
            contactInfo[key] = '';
         }
         form.value.reset();
      }
      
      let submitHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let contactResponse = await customerApi.contact({
            iType: contactInfo.type,
            vName: contactInfo.name,
            vEmail: contactInfo.email,
            vTitle: contactInfo.subject,
            vContent: contactInfo.content
         });
         contactResult.message = contactResponse.message;
         if (contactResponse.status === 1) resetHandler();
         contactModal.value.openModal();
         isLoading.value = false;
      }
      
      return { isLoading, contactInfo, contactResult, form, contactModal, submitHandler }
   }
}
</script>

<style lang="scss" scoepd>
.contact-block {
   display: flex;
   justify-content: center;
   >.imgBox {
      flex: 0 0 350px;
      >img {
         display: block;
         @include size(100%, auto);
      }
   }
   >.form-outer {
      flex: 1;
      max-width: 500px;
      margin-left: 20px;
      padding: 30px 25px;
      border: 1px solid map-get($borderColor, outer);
   }
}
.form-layout {
   .form-title {
      flex: 0 0 120px;
   }
}
.btnBox {
   button {
      width: 120px;
   }
}
</style>