import { thirdPartyAuthRequest } from './third-party-auth.js';
import { thirdPartyApiRequest } from './third-party-api.js';
import { cartRequest } from './cart.js';
import { activityCartRequest } from './activity-cart.js';
import { scenesRequest } from './scenes.js';
import { productRequest } from './product.js';
import { activityRequest } from './activity.js';
import { customerRequest } from './customer-service.js';

export const thirdPartyAuthApi = thirdPartyAuthRequest;
export const thirdPartyApi = thirdPartyApiRequest;
export const cartApi = cartRequest;
export const activityCartApi = activityCartRequest;
export const scenesApi = scenesRequest;
export const productApi = productRequest;
export const activityApi = activityRequest;
export const customerApi = customerRequest;