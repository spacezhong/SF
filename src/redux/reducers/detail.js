import * as types from '../action-types';
import {combineReducers} from "redux";

const initState={
    list:{
        detailList:{},//{code:0,success:'获取数据成功',detailList}
    },
    count:{
        num:1
    },
    aboutCart:{
        flag:false,
        goodsNum:0,
    },
    collect:{
        activeKey:false,
        lists:[],
        success:''
    }

};
const list=(state=initState.list,action)=>{
    switch(action.type){
        case types.FETCH_DETAIL_REQUEST:
            return {
                ...state,
            };
        case types.FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                detailList:action.payload,
            };
        default:
            return state
    }
};
let renderNum=(state,action)=>{
    if(action.doType==='add'){
        action.num++;
            return{
                ...state,
                num:action.num,
            }
    }else if(action.doType==='minus'){
        action.num--;
        if( action.num<=0){
            action.num=1;
            return {
                ...state,
                num:action.num
            }
        }else{
            return {
                ...state,
                num:action.num
            }
        }
    }
};
const count=(state=initState.count,action)=>{
    switch(action.type){
        case types.CHANGE_NUMBER:
            return renderNum(state,action);
        case types.INITIALIZER_NUM:
            return {
                ...state,
                num:action.num,
            };
        default:
            return state
    }
};
const aboutCart=(state=initState.aboutCart,action)=>{
    switch(action.type){
        case types.ADD_CART:
            return {
                ...state,
                flag:action.flag,
                goodsNum:action.goodsNum,
            };
            case types.FIND_CART:
            return {
                ...state,
                goodsNum:action.goodsNum,
            };
        case types.CLEAR_GOODSNUM:
            return {
                ...state,
                goodsNum:action.goodsNum,
            };
        case types.WRITE_OFF_CART:
            return {
                ...state,
                goodsNum:action.goodsNum,
            };
        default:
            return state
    }
};
const collect=(state=initState.collect,action)=>{
    switch(action.type){
        case types.CHANGE_COLLECT_KEY:
            return {
                ...state,
                activeKey:action.activeKey,
            };
        case types.ADD_COLLECT_SUCCESS:
            return {
                ...state,
                lists:action.payload,//[{},{}]
            };
        case types.FIND_COLLECT:
            return {
                ...state,
                activeKey:action.activeKey,
                lists:action.lists,
            };
        case types.CANCEL_COLLECT:
            return {
                ...state,
                success:action.payload
            };
        default:
            return state
    }
};
let reducer=combineReducers({
    list,
    count,
    aboutCart,
    collect,
});
export default reducer;