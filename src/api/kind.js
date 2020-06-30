import axios from './index';
export const getKind=()=>{
  return axios.get('/kind');
};