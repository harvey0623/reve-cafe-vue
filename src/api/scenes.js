import { httpConfig } from './config.js';

export const scenesRequest = {
   banner() {
      return httpConfig({
         url: '/scenes/banner',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   },
   brand() {
      return httpConfig({
         url: '/scenes/article/brand',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}