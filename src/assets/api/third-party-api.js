import { httpConfig } from './config.js';

export const thirdPartyRequest = {
   getTerm(payload) {
      return httpConfig({
         url: '/third_party_api/term/doBriefTerm',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data
      })
   }
}