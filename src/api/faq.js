import { httpConfig } from './config.js';

export const faqRequest = {
   get() {
      return httpConfig({
         url: '/faq/',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
}