import * as types from '../action-types';

const initState={
    isEditing:false,//是否正在编辑：否
    allCheck:true,
    lists:[],
};
const reducer=(state=initState,action)=>{
    switch(action.type){
        case types.CHANGE_EDIT:
            return {
                ...state,
                isEditing:action.isEditing,
            };
        case types.ALL_CHANGE_EDIT:
            return {
                ...state,
                allCheck:action.allCheck,
            };
        case types.FETCH_CART:
            return {
                ...state,
                lists:action.payload,
            };
        case types.CHANGE_CHECKED:
            return {
                ...state,
                lists:action.lists,
                allCheck:action.allCheck
            };
        case types.UPDATE_USER_CART:
            return {
                ...state,
                lists:action.lists,
            };
        case types.DELETE_CART_INFO:
            return {
                ...state,
                lists:action.lists,
            };
        case types.EMPTY_ALL:
            return {
                ...state,
                lists:action.lists,
            };
        default:
            return state
    }
};
export default reducer;