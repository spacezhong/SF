import axios from 'axios';
axios.defaults.baseURL='http://localhost:9000';
axios.interceptors.response.use(res=>{
    return res.data;
});
export default axios;