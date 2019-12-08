export const API_DOMAIN = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://enjoy.tv'
    : 'https://tv.zikwall.ru';
