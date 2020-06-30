import {FETCH_KIND_REQUEST,FETCH_KIND_SUCCESS,CHANGE_LEFT_INDEX} from '../action-types';
import {getKind} from '../../api/kind';
const actions={
  getKindAPI:()=>{
      return (dispatch,getState)=>{
          dispatch({
              type:FETCH_KIND_REQUEST,
              payload:null
          });
          dispatch({
              type:FETCH_KIND_SUCCESS,
              payload:getKind()
          })
      }
  },
    clickLeftAPI:(leftIndex)=>{
        return (dispatch,getState)=>{
            dispatch({
                type:CHANGE_LEFT_INDEX,
                leftIndex
            })
        }
    }
};
export default actions;