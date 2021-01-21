import * as types from '../action-types';
import {combineReducers} from "redux";
import {TABKEY} from '../../config';

console.log(TABKEY);
let tabs={
    [TABKEY.all]:{//{['all']:{text:'',}}
        text:'全部分类',
        key:TABKEY.all,
    },
    [TABKEY.price]:{
        text:'价格',
        key:TABKEY.price,
    },
    [TABKEY.sift]:{
        text:'筛选',
        key:TABKEY.sift,
    }
};
const initState={
   list:{
       listData:{},//{code:1,success:'获取数据成功',list}
       filterData:{},//{code:0,success:'获取数据成功',filterData}
       tabs:tabs,
       activeKey:'',
       closePanel:true,
   }
};
const changeFilter=(state,action)=>{
    let _tabs=JSON.parse(JSON.stringify(tabs));
    _tabs[action.key]={
        text:action.currentItem.name,
        key:action.key,
    };
    return {...state,tabs:_tabs};
};
const list=(state=initState.list,action)=>{
    switch(action.type){
        case types.FETCH_LIST_REQUEST:
            return {
                ...state,
            };
        case types.FETCH_LIST_SUCCESS:
            return {
                ...state,
                listData:action.payload,//{code:1,success:'获取数据成功',list}
            };
        case types.FETCH_FILTERDATA_SUCCESS:
            return {
                ...state,
                filterData:action.payload,//{code:0,success:'获取数据成功',filterData}
            };
        case types.CHANGE_FILTER_TYPE:
            return changeFilter(state,action);
        case types.CHANGE_BARTAB:
            return {
                ...state,
                activeKey:action.activeKey,
                closePanel:action.closePanel
            };
        case types.RECOVER:
            return {
                ...state,
                activeKey:action.activeKey,
                closePanel:action.closePanel,
                tabs:tabs,
            };
        default:
            return state
    }
};
let reducer=combineReducers({
    list,

});
export default reducer;