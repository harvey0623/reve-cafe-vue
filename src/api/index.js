import { thirdPartyAuthRequest } from './third-party-auth.js';
import { thirdPartyApiRequest } from './third-party-api.js';
import { cartRequest } from './cart.js';
import { activityCartRequest } from './activity-cart.js';

export const thirdPartyAuthApi = thirdPartyAuthRequest;
export const thirdPartyApi = thirdPartyApiRequest;
export const cartApi = cartRequest;
export const activityCartApi = activityCartRequest;