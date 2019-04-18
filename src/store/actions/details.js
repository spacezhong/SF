import * as types from "../action-types";
import {getDetails, addGoodsCart, findGoodsCart} from '../../api/detail'

let actions = {
    //常看详细信息
    detailInfo(id){
        return function (dispatch, getState) {
            getDetails(id).then(result => {
                dispatch({
                    type: types.SEARCH_DETAIL,
                    payload: result
                })
            })
        }
    },

    //查看购物车
    findCart(username, id){
        return function (dispatch, getState) {
            findGoodsCart(username).then(result => {
                console.log(result);
                let ele = result.userCommoditie.list.find(item => (
                item.recommendID == id));
                if(ele){
                    dispatch({
                        type: types.FIND_CART,
                        payload:ele.count
                    })
                }
            })
        }
    },
    //如果登录添加到购物车
    addCart(good){
        return function (dispatch, getState) {
            console.log(good);
            //如果已登录 添加到购物车列表
            if(good.username){
                addGoodsCart(good)
            }
            dispatch({
                type: types.ADD_CART,
                payload: good.count
            })
        }
    }
};
export default actions