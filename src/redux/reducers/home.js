import * as types from '../action-types';
import {getHomeSwipe,getHomeCategory,getHomeHeadline,getHomeDiscount,getHomeList} from '../../api/home';
import {combineReducers} from "redux";

const initState={
    swipe:{
        isFetching:false,
        data:{}
    },
    category:{
        isFetching:false,
        data:{},//{code:0,success:'xxx',homeCategory}
    },
    headline:{
        isFetching:false,
        data:{},//{code:0,success:'xxx',homeHeadline}
    },
    discount:{
        isFetching:false,
        data:{},//{code:0,success:'xxx',homeDiscount}
    },
    list:{
        isFetching:false,
        loadingText:'加载中',
        offset:0,//从数组索引为0的第一条数据开始
        limit:5,//每次获取5条,
        hasMore:true,
        data:{},//{code:0,success:'xxx',listData}
    }

};

const swipe=(state=initState.swipe,action)=>{//必须注意：state是取到initState.swipe
  switch(action.type){
      case types.FETCH_SWIPE_REQUEST:
          return {
              ...state,
              isFetching:true,
          };
      case types.FETCH_SWIPE_SUCCESS:
          return {
                  ...state,
              isFetching:false,
              data:action.payload
          };
      default:
          return state;
  }
};
//获取category的reducer
const category=(state=initState.category,action)=>{//注意state是取到initState.category
    switch(action.type){
        case types.FETCH_CATEGORY_REQUEST:
            return {
                    ...state,
                isFetching:true
            };
        case types.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching:false,
                data:action.payload,//{code:0,success:'xxx',homeCategory}
            };
        default:
            return state;
    }
};
//获取headline的reducer
const headline=(state=initState.headline,action)=>{//注意state是取到initState.headline
    switch(action.type){
        case types.FETCH_HEADLINE_REQUEST:
            return {
                ...state,
                isFetching:true,
            };
        case types.FETCH_HEADLINE_SUCCESS:

            return {
                ...state,
                isFetching:false,
                data:action.payload,//{code:0,success:'xxx',homeHeadline}
            };
        default:
            return state;
    }
};
//获取discount的reducer
const discount=(state=initState.discount,action)=>{
    switch(action.type){
        case types.FETCH_DISCOUNT_REQUEST:

            return {
                ...state,
                isFetching:true,
            };
        case types.FETCH_DISCOUNT_SUCCESS:
            return {
                ...state,
                isFetching:false,
                data:action.payload,//{code:0,success:'xxx',homeDiscount}
            };
        default:
            return state;
    }
};
//获取list的reducer
const list=(state=initState.list,action)=>{
    switch(action.type){
        case types.FETCH_HOME_LIST_REQUEST:
            return {
                    ...state,
                isFetching:true,
            };
        case types.FETCH_HOME_LIST_SUCCESS:

            return {
                ...state,
                isFetching:false,
                offset:state.offset+action.payload.listData.length,
                limit:5,
                hasMore:action.payload.hasMore,
                loadingText:action.payload.loadingText,
                data:action.payload,//{code:0,success:'xxx',hasMore,loadingText,listData}
            };

        default:
            return state;
    }
};
let home=combineReducers({
    swipe,
    category,
    headline,
    discount,
    list
});
export default home;
