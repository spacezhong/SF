import * as types from '../action-types';

const initState={
    activeKey:'home',

};
const reducer=(state=initState,action)=>{
    switch(action.type){
        case types.CHANGE_BOTTOM_ACTIVE_TYPE:
            return {
                ...state,
                activeKey:action.activeKey,
            };

        default:
            return state
    }
};

export default reducer;