import {get,post} from './index';
// 注册 退出
export function reg(user) {
    return post('/reg',user);
};

// 登录
export function login(user) {
    return post('/login',user);
};

// 退出
export function logout() {
    return get('/logout');
};

// 验证
export function validateUser() {
    return get('/validate');
};

// 修改密码
export function changepassword({user,newpassword}) {
    return post('/changepassword',{user,newpassword})
};

// 清除alert信息
