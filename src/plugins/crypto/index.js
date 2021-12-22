import CryptoJS from 'crypto-js';

export const wm_aes = function (input) {
   var keyHash = CryptoJS.SHA384(process.env.VUE_APP_AESKEY);
   var key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0, 64));
   var iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64, 96));
   var encrypted = CryptoJS.AES.encrypt(input, key, { iv: iv });
   return encrypted.toString();
}