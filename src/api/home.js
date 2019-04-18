import {get,post} from './index';
/*

 */
export function getSliders() {
    return get('/home/carousel');
}

export  function getRecommends(offset,limit) {
    return get(`/public/recommend?offset=${offset}&limit=${limit}`);
}