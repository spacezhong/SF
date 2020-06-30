import {getHomeSwipe,getHomeCategory,getHomeHeadline,getHomeDiscount,getHomeList} from '../../api/home';
import {combineReducers} from "redux";
//动作常量
const types={
    //获取Swipe
    FETCH_SWIPE_REQUEST:'HOME/FETCH_SWIPE_REQUEST',
    FETCH_SWIPE_SUCCESS:'HOME/FETCH_SWIPE_SUCCESS',
    //获取category
    FETCH_CATEGORY_REQUEST:'HOME/FETCH_CATEGORY_REQUEST',
    FETCH_CATEGORY_SUCCESS:'HOME/FETCH_CATEGORY_SUCCESS',
    //获取headline
    FETCH_HEADLINE_REQUEST: 'HOME/FETCH_HEADLINE_REQUEST',
    FETCH_HEADLINE_SUCCESS: 'HOME/FETCH_HEADLINE_SUCCESS',
    //获取discount
    FETCH_DISCOUNT_REQUEST: 'HOME/FETCH_DISCOUNT_REQUEST',
    FETCH_DISCOUNT_SUCCESS: 'HOME/FETCH_DISCOUNT_SUCCESS',
    //获取list
    FETCH_LIST_REQUEST: 'HOME/FETCH_LIST_REQUEST',
    FETCH_LIST_SUCCESS: 'HOME/FETCH_LIST_SUCCESS',

};

//actions
export const actions={
    //获取swipe数据
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
                 type:types.FETCH_LIST_REQUEST,
               payload:null
             });
                let {offset,limit}=getState().home.list;//这里要特别注意了,必须使用两层list才能取到offset,limit！！
                dispatch({
                    type:types.FETCH_LIST_SUCCESS,
                    payload:getHomeList(offset,limit)
                })
        }
    }
};

//home的初始state:
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

//获取swipe的reducer
const swipe=(state=initState.swipe,action)=>{//必须注意：state是取到initState.swipe
  switch(action.type){
      case types.FETCH_SWIPE_REQUEST:
          return {
              ...state,
              isFetching:true
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
                isFetching:true
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
                isFetching:true
            };
        case types.FETCH_DISCOUNT_SUCCESS:
            return {
                ...state,
                isFetching:false,
                data:action.payload, //{code:0,success:'xxx',homeDiscount}
            };
        default:
            return state;

    }
};
//获取list的reducer
const list=(state=initState.list,action)=>{
    switch(action.type){
        case types.FETCH_LIST_REQUEST:
            return {
                ...state,
                isFetching:true
            };
        case types.FETCH_LIST_SUCCESS:
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
