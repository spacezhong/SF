import axios from './index';
export const getList=(title)=>{
    return axios.get(`/classification/${title}`);
};
export const getFilterData=()=>{
    return axios.get('/filterData');
};