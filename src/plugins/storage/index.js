import Vue from "vue";
const storage = {
   getItem(key) {
      let data = localStorage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
   },
   setItem(key, payload) {
      localStorage.setItem(key, JSON.stringify(payload));
   },
   removeItem(key) {
      localStorage.removeItem(key);
   },
   getSessionItem(key) {
      let data = sessionStorage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
   },
   setSessionItem(key, payload) {
      sessionStorage.setItem(key, JSON.stringify(payload));
   },
   removeSessionItem(key) {
      sessionStorage.removeItem(key);
   },
};

// Vue.prototype.$storage = storage;
export const storageObj = storage;