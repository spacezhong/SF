import axios from './index';

export const getCart=(username)=>{
    return axios.get(`/findCart?username=${username}`);
};
export const update=(obj)=>{
    return axios.post('/updateCart',obj);
};
export const deleteInfo=(obj)=>{
    return axios.post('/deleteCartInfo',obj);
};
export const emptyAll=(username)=>{
    return axios.get(`/deleteCartInfo?username=${username}`);
};
