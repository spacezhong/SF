import * as types from '../action-types'
let initSearch={
    loading:false,
    searchs:[],
    hotSearch:[],
    historical:[],
    type:"undefined"
};

export default function (state=initSearch,action) {
    switch (action.type){
        case types.SEARCH:
            return {...state, loading:true};
        case types.SEARCH_SUCCESS:
            let type=action.payload.type?action.payload.type:"undefined";
            return {...state,searchs:action.payload.searchs,type,loading:false};
        case types.HOT_SEARCH:
            return {...state,hotSearch:action.payload.hotSearch};
        case types.HISTORICAL:
            return {...state,historical:action.payload.historical};
        default :
            return state;
    }
}
