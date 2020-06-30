import * as types from '../action-types';
import {push} from 'react-router-redux';//使用这个必须要在App.js里使用ConnectedRouter，并且传入history属性，然后再store.js中
//使用路由中间件，合并路由
import {getSearch,getSearchHot,getSearchHistory} from '../../api/search';
import {getFilterData, getList} from "../../api/list";
const actions={
    searchAPI(value){
        return (dispatch,getState)=>{
            getSearch(value).then(res=>{
                let {code,err,success,data}=res;
                if(code===0){
                    dispatch({
                        type:types.FETCH_SEARCH_SUCCESS,
                        payload:{code,success,data},
                    });
                    dispatch(push(`/searchList/${value}`));
                }else{
                    dispatch({
                        type:types.FETCH_SEARCH_SUCCESS,
                        payload:{code,err},
                    });
                }
            });
        }
    },
    getHotSearchAPI(){
        return (dispatch,getState)=>{
            dispatch({
                type:types.FETCH_SEARCH_HOT_REQUEST
            });
            dispatch({
                type:types.FETCH_SEARCH_HOT_SUCCESS,
                payload:getSearchHot()
            })
        }
    },
    getSearchHistoryAPI(type){
        return (dispatch,getState)=>{
            dispatch({
                type:types.FETCH_SEARCH_HISTORY_SUCCESS,
                payload:getSearchHistory(type)
            })
        }
    },
    getFilterDataAPI(){
        return (dispatch,getState)=>{

            dispatch({
                type:types.FETCH_FILTERDATA_SUCCESS,
                payload:getFilterData()
            })
        }
    },
    changeBarTabAPI(barTab,closePanel){
        return (dispatch,getState)=>{
            dispatch({
                type:types.CHANGE_BARTAB,
                activeKey:barTab,
                closePanel
            })
        }
    },
    changeFilterAPI(key,currentItem){
        return (dispatch,getState)=>{
            dispatch({
                type:types.CHANGE_FILTER_TYPE,
                currentItem,
                key,//key一定要传入，为了在reducer里得到新的tabs
            });
            dispatch({
                type:types.CHANGE_BARTAB,
                activeKey:key,
                closePanel:true,//主要是为了关上面板
            })
        }
    }
    


};
export default actions;