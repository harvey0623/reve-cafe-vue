import { httpConfig } from './config.js';

export const thirdPartyAuthRequest = {
   login(payload) {
      return httpConfig({
         url: '/third_party_auth/login',
         method: 'post',
         data: { ...payload }
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}