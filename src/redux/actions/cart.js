import * as Types from '../action-types';
import {getCart,update,deleteInfo,emptyAll} from '../../api/cart';
const actions={
    getCartAPI(username){
        return(dispatch,getState)=>{
            getCart(username).then(res=>{
                let {code,lists}=res;
                dispatch({
                    type:Types.FETCH_CART,
                    payload:lists,
                })
            });
        }
    },
    changeEditAPI(editFlag){
        return (dispatch,getState)=>{
            dispatch({
                type:Types.CHANGE_EDIT,
                isEditing:editFlag,
            });
        }
    },
    allChangeCheckedAPI(allChangeFlag){
        return (dispatch,getState)=>{
            getState().cart.lists.forEach(item=>{
                item.selected=allChangeFlag;
            });
            dispatch({
                type:Types.ALL_CHANGE_EDIT,
                allCheck:allChangeFlag,
                lists:getState().cart.lists,
            });
        }
    },
    //点击单个复选框：
    changeCheckedAPI(id){
        return(dispatch,getState)=>{
            let lists=getState().cart.lists.map(item=>{
                return(
                    item.recommendID===id
                        ? {...item,selected:!item.selected}
                        :item
                )
            });
            let flag=lists.every(item=>{
                return item.selected
            });
            dispatch({
                type:Types.CHANGE_CHECKED,
                lists,
                allCheck:flag,
            });
        }
    },
/*obj={
    username:this.props.username,
        selected:true,
    recommendID,
    num,
}*/
    updateAPI(obj){
        return(dispatch,getState)=>{
            update(obj).then(res=>{
                let {code,lists}=res;
                dispatch({
                    type:Types.UPDATE_USER_CART,
                    lists,
                })
            })
        }
    },
    //删除购物车里的某项：
    deleteAPI(obj){
        return(dispatch,getState)=>{
            deleteInfo(obj).then(res=>{
                let {code,lists}=res;
                dispatch({
                    type:Types.DELETE_CART_INFO,
                    lists,
                })
            })
        }
    },
    //全部清空
    emptyAllAPI(username){
        return(dispatch,getState)=>{
            emptyAll(username).then(res=>{
                let{code,success,lists}=res;
                dispatch({
                    type:Types.EMPTY_ALL,
                    lists:lists,
                })
            });
        }
    }


};
export default actions;