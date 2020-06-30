import * as types from '../action-types';

const initState={
    lists:[],
    error:''

};
const reducer=(state=initState,action)=>{
    switch(action.type){
        case types.FETCH_COLLECT_SUCCESS:
            return {
                ...state,
                lists:action.lists,
                error:'',
            };
        case types.FETCH_COLLECT_FAIL:
            return {
                ...state,
                error:action.error,
            };
        default:
            return state
    }
};

export default reducer;