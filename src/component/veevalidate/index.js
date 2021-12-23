import Vue from 'vue';
import { ValidationObserver , ValidationProvider, extend, setInteractionMode } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

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

// extend('term', {
//    message: '請同意條款',
//    validate(value) {
//       return value;
//    }
// });