import * as types from '../action-types'

const initState={
  loading:false,
};
export default function (state=initState,action) {
    switch (action.type){
        case types.GET_LIST:
            return {
                ...state,
                loading:true,
            };
        case types.GET_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                ...action.payload
            };
        default:
            return state;
    }
}