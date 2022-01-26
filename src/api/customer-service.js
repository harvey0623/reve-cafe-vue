import { httpConfig } from './config.js';

export const customerRequest = {
   contact(payload) {
      return httpConfig({
         url: '/customer/contact',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
}