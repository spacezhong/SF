import {get} from "./index"
//搜索
export let getSearch=(keyWords,type)=> get(`/public/search?keyWord=${keyWords}&type=${type}`);
//热门搜索
export let getHotSearch=()=>get(`/hotSearch`);

//历史记录
export let getHistorical=(type)=>get(`/historical?type=${type}`);

