import Vue from 'vue';
import { ValidationObserver , ValidationProvider, extend, setInteractionMode } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import dayjs from 'dayjs';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
setInteractionMode('eager');

extend('required', {
   ...required,
   message: '必填'
});

extend('email', {
   ...email,
   message: '電子信相格式有誤'
});

extend('phone', {
   message: '手機號碼格式有誤',
   validate: value => /^09\d{8}$/.test(value)
});

extend('password', {
   message: '6-12字元英數字組合',
   validate(value) {
      let rule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
      return rule.test(value);
   }
});

extend('confirmPw', {
   params: ['target'],
   message: '確認密碼有誤',
   validate(value, { target }) {
      return value === target;
   }
});

extend('birthday', {
   message: '需滿18歲才能註冊',
   validate(value) {
      let year = dayjs().year();
      let month = dayjs().month();
      let date = dayjs().date();
      let today = dayjs().set('year', year).set('month', month).set('date', date);
      let birthday = dayjs(value);
      return today.diff(birthday, 'year') >= 18;
   }
});

// extend('term', {
//    message: '請同意條款',
//    validate(value) {
//       return value;
//    }
// });