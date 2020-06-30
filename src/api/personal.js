import axios from './index';
//注册：
export const reg=({username,password})=>{
    return axios.post('/reg',{username,password});
};
//登录：
export const login=({username,password})=>{
    return axios.post('/login',{username,password});
};
//到个人中心页时，需要判断用户是否已经登录，已经登录的，需要显示用户名：
export const validate=()=>{
  return axios.get('/validate');
};
export const changPassword=({username,password,newPasswordFirst})=>{
  return axios.post('/changePassword',{username,password,newPasswordFirst})
};
//退出登录：
export const loginOut=()=>{
    return axios.get('/loginOut');
};
//注销：
export const writeOff=({username,password})=>{
    return axios.post('/writeOff',{username,password});
};
