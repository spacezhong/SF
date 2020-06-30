import axios from './index';

export const getCollect=(username)=>{
    return axios.get(`/collect?username=${username}`);
};