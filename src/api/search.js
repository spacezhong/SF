import axios from './index';
export const getSearch=(value)=>{
    return axios.get(`/search?value=${value}`);
};
export const getSearchHot=()=>{
    return axios.get(`/hotSearch`);
};
export const getSearchHistory=(type)=>{
    return axios.get(`/searchHistory?type=${type}`);
};