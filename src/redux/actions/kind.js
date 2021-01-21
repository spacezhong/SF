import {FETCH_KIND_REQUEST,FETCH_KIND_SUCCESS,CHANGE_LEFT_INDEX} from '../action-types';
import {getKind} from '../../api/kind';

export let getKindAPI=()=>{
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
};
export let clickLeftAPI=(leftIndex)=>{
        return (dispatch,getState)=>{
            dispatch({
                type:CHANGE_LEFT_INDEX,
                leftIndex
            })
        }
};


