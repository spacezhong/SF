import {get} from './index';
//获取分类页数据
export function getListData() {
    return get('/list');
}
//获取每一个分类的数据
export function getClassificationData(keyWord,type){
    return get(`/public/classification?keyWord=${keyWord}&type=${type}`)
}

