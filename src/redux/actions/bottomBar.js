import * as Types from '../action-types';

const actions={
    changeActive(doType){
        return(dispatch,getState)=>{
            dispatch({
                type:Types.CHANGE_BOTTOM_ACTIVE_TYPE,
                activeKey:doType
            })
        }
    }
};
export default actions;