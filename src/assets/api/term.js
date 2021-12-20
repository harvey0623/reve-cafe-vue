import { httpConfig } from './config.js';

export const termRequest = {
   getTerm(payload) {
      return httpConfig({
         url: '/test',
         method: 'post',
         data: payload
      }).then(res => {
         return res.data.results;
      })
   }
}