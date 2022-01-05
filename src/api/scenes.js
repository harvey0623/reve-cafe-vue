import { httpConfig } from './config.js';

export const scenesRequest = {
   banner() {
      return httpConfig({
         url: '/scenes/banner',
         method: 'get',
         data: {}
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}