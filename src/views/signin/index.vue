<template>
   <div class="signin">
      <div class="center-block">
         <div class="signin-slogon">
            <p>如果已經是是會員</p>
            <p>登入即可快速結帳 / 查看訂單 / 修改個人資訊以及更多功能</p>
         </div>
         <div class="signin-bottom">
            <div class="left">
               <div class="form-layout">
                  <div class="form-row">
                     <p class="form-title">帳號</p>
                     <div class="form-content">
                        <input type="text" class="form-control" placeholder="請輸入手機號碼">
                     </div>
                  </div>
                  <div class="form-row">
                     <p class="form-title">密碼</p>
                     <div class="form-content">
                        <input type="text" class="form-control" placeholder="請輸入密碼">
                     </div>
                  </div>
               </div>
               <div class="btnBox">
                  <button class="btn-primary">登入</button>
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
   </div>
</template>

<script>
import { ref, computed, reactive } from '@vue/composition-api'
export default {
   name: 'signin',
   metaInfo () {
      return {
        title: '登入',
      }
   },
   setup() {

   }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>