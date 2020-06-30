import * as types from '../action-types';
import {combineReducers} from "redux";

const initState={
    kindList:{
        data:{},
        currentLeftIndex:0,
    }


};
const kindList=(state=initState.kindList,action)=>{
    switch(action.type){
        case types.FETCH_KIND_REQUEST:
            return {
                ...state,
            };
        case types.FETCH_KIND_SUCCESS:
            return {
                ...state,
                data:action.payload
            };
        case types.CHANGE_LEFT_INDEX:
            return {
                ...state,
                currentLeftIndex:action.leftIndex
            };
        default:
            return state
    }
};
let reducer=combineReducers({
    kindList,
});
export default reducer;