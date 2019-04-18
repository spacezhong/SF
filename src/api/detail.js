import {get,post} from "./index"

//获取详情信息
export let getDetails=(id)=>{
    return get(`/public/details?id=${id}`);
};

//查看此详情商品是否在购物车
export let findGoodsCart=(username)=>{
    return  get(`/findCart?username=${username}`);
};

//添加数据到购物车
export let addGoodsCart=(good)=>{
    return  post(`/public/cart`,good);
};
