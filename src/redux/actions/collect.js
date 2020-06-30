import * as Types from '../action-types';
import {getCollect} from '../../api/collect';
const actions={
    getCollectAPI(username){
        return(dispatch,getState)=>{
            getCollect(username).then(res=>{
                let {code,success,error,lists}=res;
                //{code:0,success:'获取收藏信息成功',lists}
                //{code:1,error:'您还没有收藏信息'}
                if(code===0){
                    dispatch({
                        type:Types.FETCH_COLLECT_SUCCESS,
                        lists:lists,
                    })
                }else{
                    dispatch({
                        type:Types.FETCH_COLLECT_FAIL,
                        error,
                    })
                }

            })
        }
    },


};
export default actions;