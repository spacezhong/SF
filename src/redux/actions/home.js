import * as types from '../action-types';
import {getHomeCategory, getHomeDiscount, getHomeHeadline, getHomeList, getHomeSwipe} from "../../api/home";

/*const actions={
    swipeAPI(){
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_SWIPE_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_SWIPE_SUCCESS,
            payload:getHomeSwipe()
        })
    }
},
//获取category数据
    categoryAPI(){
    return(dispatch,getState)=>{
        dispatch({
            type:types.FETCH_CATEGORY_REQUEST,
            payload:null,
        });
        dispatch({
            type:types.FETCH_CATEGORY_SUCCESS,
            payload:getHomeCategory()
        })
    }
},
//获取headline数据
    headlineAPI(){
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_HEADLINE_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_HEADLINE_SUCCESS,
            payload:getHomeHeadline()
        })
    }
},
    discountAPI(){
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_DISCOUNT_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_DISCOUNT_SUCCESS,
            payload:getHomeDiscount(),
        })
    }
},
    listAPI(){
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_HOME_LIST_REQUEST,
            payload:null
        });
        let {offset,limit}=getState().home.list;//这里要特别注意了,必须使用两层list才能取到offset,limit！！
        dispatch({
            type:types.FETCH_HOME_LIST_SUCCESS,
            payload:getHomeList(offset,limit)
        });
    }
},
};
export default actions;*/

export let swipeAPI=()=>{
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_SWIPE_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_SWIPE_SUCCESS,
            payload:getHomeSwipe()
        })
    }
};
//获取category数据
export let categoryAPI=()=>{
    return(dispatch,getState)=>{
        dispatch({
            type:types.FETCH_CATEGORY_REQUEST,
            payload:null,
        });
        dispatch({
            type:types.FETCH_CATEGORY_SUCCESS,
            payload:getHomeCategory()
        })
    }
};
//获取headline数据
export let headlineAPI=()=>{
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_HEADLINE_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_HEADLINE_SUCCESS,
            payload:getHomeHeadline()
        })
    }
};
export let discountAPI=()=>{
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_DISCOUNT_REQUEST,
            payload:null
        });
        dispatch({
            type:types.FETCH_DISCOUNT_SUCCESS,
            payload:getHomeDiscount(),
        })
    }
};
export let listAPI=()=>{
    return (dispatch,getState)=>{
        dispatch({
            type:types.FETCH_HOME_LIST_REQUEST,
            payload:null
        });
        let {offset,limit}=getState().home.list;//这里要特别注意了,必须使用两层list才能取到offset,limit！！
        dispatch({
            type:types.FETCH_HOME_LIST_SUCCESS,
            payload:getHomeList(offset,limit)
        });
    }
};
