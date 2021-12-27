<template>
   <div class="signin">
      <div class="center-block">
         <div class="signin-slogon">
            <p>如果已經是是會員</p>
            <p>登入即可快速結帳 / 查看訂單 / 修改個人資訊以及更多功能</p>
         </div>
         <div class="signin-bottom">
            <div class="left">
               <validation-observer class="form-layout" tag="div" ref="form">
                  <div class="form-row">
                     <p class="form-title">帳號</p>
                     <validation-provider class="form-content" rules="required|phone" v-slot="{ errors, failed }">
                        <input type="number" class="form-control" placeholder="請輸入手機號碼" v-model.trim="user.account">
                        <p class="error-text" v-show="failed">{{ errors[0] }}</p>
                     </validation-provider>
                  </div>
                  <div class="form-row">
                     <p class="form-title">密碼</p>
                     <validation-provider class="form-content" rules="required|password" v-slot="{ errors, failed }">
                        <input type="password" class="form-control" placeholder="請輸入密碼" v-model.trim="user.password">
                        <p class="error-text" v-show="failed">{{ errors[0] }}</p>
                     </validation-provider>
                  </div>
               </validation-observer>
               <div class="btnBox">
                  <button class="btn-primary" @click="loginHandler">登入</button>
               </div>
               <p class="forgot">
                  <router-link to="/">忘記密碼?</router-link>
               </p>
            </div>
            <div class="right">
               <p class="not-member">還不是會員嗎?</p>
               <div class="encourage-box">
                  <p>加入會員，享受專屬服務。</p>
                  <p>並能接受第一手最新消息!</p>
               </div>
               <img :src="require('@/assets/img/register-bg.jpg')" class="register-img">
               <div class="btnBox no-mt">
                  <router-link to="/" class="btn-hover-primary">立即註冊加入會員</router-link>
               </div>
            </div>
         </div>
      </div>
      <Loading v-show="isLoading"></Loading>
   </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { wm_aes } from '@/plugins/crypto/index.js'
export default {
   name: 'signin',
   metaInfo () {
      return {
        title: '登入',
      }
   },
   setup(props, { root }) {
      let user = reactive({ account: '0986104667', password: 'abc123' });
      let isLoading = ref(false);
      let form = ref(null);

      let loginHandler = async() => {
         let isValid = await form.value.validate();
         if (!isValid) return;
         isLoading.value = true;
         let loginResult = await root.$store.dispatch('auth/login', {
            account: wm_aes(user.account),
            password: wm_aes(user.password)
         });
         console.log(loginResult);
         isLoading.value = false;
      }

      return { user, form, loginHandler, isLoading };
   }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>