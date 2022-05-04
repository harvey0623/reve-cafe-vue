import { httpConfig } from './config.js';

export const webConfigRequest = {
   getConfig() {
      return httpConfig({
         url: '/webConfig',
         method: 'get',
      }).then(res => {
         return res.data;
      }).catch(err => {
         return err.response.data;
      })
   }
}