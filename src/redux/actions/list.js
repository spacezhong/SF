import * as types from '../action-types';
import {getList,getFilterData} from '../../api/list';

const actions={
    getListAPI(title){
        return (dispatch,getState)=>{

            dispatch({
                type:types.FETCH_LIST_SUCCESS,
                payload:getList(title)
            })
        }
    },
    getFilterDataAPI(){
        return (dispatch,getState)=>{
            dispatch({
                type:types.FETCH_FILTERDATA_REQUEST
            });
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
                key,//key一定要传入，为了在reducer里得到新的tabs有key的值
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