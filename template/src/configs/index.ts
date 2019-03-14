export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const API_BASE = IS_PRODUCTION ? '../../mobile' :  'mobile';


export const ROUTING_BASE = IS_PRODUCTION ?  '' : '';

export const IS_HASH_ROUTER = true;