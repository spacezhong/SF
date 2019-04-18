import * as types from '../action-types';
const initState={
    loading:false,
};
export default function(state=initState,action){
    switch(action.type){
        case types.GET_CLASSIFICATION:
            return{
                loading:true,
            };
        case types.GET_CLASSIFICATION_SUCCESS:

            return{
                loading:false,
                ...action.payload
            };
        default:
            return state;
    }

}
