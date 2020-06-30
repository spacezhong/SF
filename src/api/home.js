import axios from './index';

//获取首页swipe数据
export const getHomeSwipe=()=>{
    return axios.get('/home/swipe')
};
//获取首页category数据
export const getHomeCategory=()=>{
    return axios.get('/home/category')
};
//获取首页headline数据
export const getHomeHeadline=()=>{
    return axios.get('/home/headline')
};
//获取首页discount数据
export const getHomeDiscount=()=>{
    return axios.get('/home/discount')
};
//获取首页list数据
export const getHomeList=(offset,limit)=>{
    return axios.get(`/home/list/${offset}/${limit}`)
};
