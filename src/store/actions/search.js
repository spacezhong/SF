import * as types from '../action-types'

import {push} from "react-router-redux"

import {getSearch, getHotSearch, getHistorical} from "../../api/search"
let actions= {
    fetchSearch(keyWords,type){
        return function (dispatch, getState) {
            dispatch({
                type: types.SEARCH
            });
            getSearch(keyWords,type).then(res => {
                let {code, error, success,searchs} = res;
                if(code==0){
                    dispatch({
                        type: types.SEARCH_SUCCESS,
                        payload: {searchs,type}
                    });
                    dispatch(push(`/searchlist/${keyWords}`))
                }
            })
        }
    },
    fetchHotSearch(){
        return function (dispatch, getState) {
            dispatch({
                type: types.HOT_SEARCH,
                payload: getHotSearch()
            })
        }
    },
    fetchHistorical(type){
        return function (dispatch, getState) {
            dispatch({
                type: types.HISTORICAL,
                payload: getHistorical(type)
            })
        }
    }
};
export default actions;
