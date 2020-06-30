import axios from './index';
export const getDetail=(id)=>{
    return axios.get(`/detail/${id}`);
};
//点击‘加入购物车’按钮后，将obj传入后台，加入后台数据中：
export const addGoodsCart=(obj)=>{
    return axios.post('/addCart',obj);
};
//如果用户登录了，刚进入详情页，就去查找用户的购物车信息：
export const findCart=(username)=>{
    return axios.get(`/findCart?username=${username}`);
};
//用户注销时，去后台把用户的购物车清空：
export const writeOffCart=(username)=>{
    return axios.get(`/writeOffCart?username=${username}`);
};
//加入收藏
export const addCollect=(obj)=>{
  return axios.post(`/addCollect`,obj)
};
//页面刚加载，去获取收藏的信息
export const getCollect=(username)=>{
    return axios.get(`/findCollect?username=${username}`)
};
//有用户名的前提下，去取消收藏
 export const cancelCollect=({username,recommendID})=>{
     return axios.get(`/cancelCollect?username=${username}&recommendID=${recommendID}`)
 };
