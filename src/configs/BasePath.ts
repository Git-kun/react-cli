const devBasePath = '/pages/';
const prodBasePath = '/p/';

export const apiBasePath = '/mobile';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const BASE_ROUTER_PATH = IS_DEV ? devBasePath : prodBasePath;

