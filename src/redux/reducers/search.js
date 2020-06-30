import * as types from '../action-types';
import {combineReducers} from "redux";
import {TABKEY} from '../../config';

let tabs={
    [TABKEY.all]:{
        text:'全部分类',
        key:TABKEY.all,
        obj:{},//用来拿页面的数据
    },
    [TABKEY.price]:{
        text:'价格',
        key:TABKEY.price
    },
    [TABKEY.sift]:{
        text:'筛选',
        key:TABKEY.sift
    }
};
const initState={
    search:{
        listData:{},//{code:0,success:'成功获取搜索数据',data:findSearchArray}
        filterData:{},//{code:0,success:'获取数据成功',filterData}
        tabs:tabs,
        activeKey:'',
        closePanel:true,

    },
    searchHot:{
        data:{},
    },
    searchHistory:{
        data:{}
    }


};
const changeFilter=(state,action)=>{
    let _tabs=JSON.parse(JSON.stringify(tabs));
    _tabs[action.key]={
        text:action.currentItem.name,
        key:action.key,
        obj:action.currentItem
    };
    return {...state,tabs:_tabs};
};
let getSearchState=(state,action)=>{
    return {
        ...state,
        listData:action.payload,//{code:0,success:'成功获取搜索数据',data:findSearchArray}
    }
};
const search=(state=initState.search,action)=>{
    switch(action.type){
        case types.FETCH_SEARCH_SUCCESS:
            return getSearchState(state,action);
        case types.FETCH_FILTERDATA_SUCCESS:
            return {
                ...state,
                filterData:action.payload,//{code:0,success:'获取数据成功',filterData}
            };
        case types.CHANGE_BARTAB:
            return {
                ...state,
                activeKey:action.activeKey,
                closePanel:action.closePanel
            };
        case types.CHANGE_FILTER_TYPE:
            return changeFilter(state,action);
        default:
            return state
    }
};

const searchHot=(state=initState.searchHot,action)=>{
    switch(action.type){
        case types.FETCH_SEARCH_HOT_REQUEST:
            return {
                ...state,
            };
        case types.FETCH_SEARCH_HOT_SUCCESS:
            return {
                ...state,
                data:action.payload
            };
        default:
            return state
    }
};
const searchHistory=(state=initState.searchHistory,action)=>{
    switch(action.type){
        case types.FETCH_SEARCH_HISTORY_SUCCESS:
            return {
                ...state,
                data:action.payload,//{code:1,success:'获取数据成功',historyData:data}
            };
        case types.FETCH_CLEAR_HISTORY_SUCCESS:
            return {
                ...state,
                data:action.data,//{code:1,success:'获取数据成功',historyData:data}
            };
        default:
            return state
    }
};

let reducer=combineReducers({
    search,
    searchHot,
    searchHistory
});
export default reducer;