import * as Types from '../action-types';
import {getDetail,addGoodsCart,findCart,writeOffCart,addCollect,getCollect,cancelCollect} from '../../api/detail';
const actions={
    getDetailAPI(id){
        return (dispatch,getState)=>{
            dispatch({
                type:Types.FETCH_DETAIL_REQUEST
            });
            dispatch({
                type:Types.FETCH_DETAIL_SUCCESS,
                payload:getDetail(id)
            })
        }

    },
    changeNum(num,doType){
        return (dispatch,getState)=>{
            dispatch({
                type:Types.CHANGE_NUMBER,
                num,
                doType,
            })
        }
    },
    //组件卸载时，初始化num:
    initializerAPI(){
        return (dispatch,getState)=>{
            dispatch({
                type:Types.INITIALIZER_NUM,
                num:1,
            })

        }
    },
    //加入购物车
    addCartAPI(obj){
        //obj={
        //             flag:true,
        //             goodsNum:goodsNum,
        //             num:this.props.num,
        //             username:username || '',
        //             selected:true
        //}
        return (dispatch,getState)=>{
            if(obj.username){
                addGoodsCart(obj);
            }
            dispatch({
                type:Types.ADD_CART,
                flag:obj.flag,
                goodsNum:obj.goodsNum,
            });
        }
    },
    //查看购物车：
    findCartAPI(username){
        if(username){
            return (dispatch,getState)=>{
                findCart(username).then(res=>{
                    //{code:0,success:'此用户有添加过商品',lists}
                    //{code:1,success:'此用户还没添加任何商品'}
                    let {code,success,lists}=res;
                    if(code===0){
                        let totalNum=lists.reduce((prev,next)=>{
                            return prev+next.num;
                        },0);
                        dispatch({
                            type:Types.FIND_CART,
                            goodsNum: totalNum,
                        })
                    }else if(code===1){
                        dispatch({
                            type:Types.FIND_CART,
                            goodsNum:0,
                        })
                    }
                })
            };
        }
    },
    //用户退出登录时，去将goodsNum置为0：
    clearGoodsNum(){
        return(dispatch,getState)=>{
            dispatch({
                type:Types.CLEAR_GOODSNUM,
                goodsNum:0,
            })
        }
    },
    //用户注销时，去后台将用户的购物车信息
    writeOffCartAPI(username){
        return(dispatch,getState)=>{
            writeOffCart(username).then(res=>{
                dispatch({
                    type:Types.WRITE_OFF_CART,
                    goodsNum:0,
                })
            })
        }
    },
    //加入收藏
    addCollectAPI(obj){
        return(dispatch,getState)=>{
            addCollect(obj).then(res=>{
                let {code,success,lists}=res;
                if(code===0){
                    dispatch({
                        type:Types.ADD_COLLECT_SUCCESS,
                        payload:lists,
                    })
                }

            })
        }
    },
    //取消收藏
    cancelCollectAPI(obj){
        //{username,recommendID}
        return (dispatch,getState)=>{
            cancelCollect(obj).then(res=>{
                let {code,success}=res;
                if(code===0){
                    dispatch({
                        type:Types.CANCEL_COLLECT,
                        payload:success
                    })
                }
            })
        }

    },
    changeActiveAPI(obj){
        return(dispatch,getState)=>{
            dispatch({
                type:Types.CHANGE_COLLECT_KEY,
                activeKey:obj.activeKey,
            })
        }
    },
    //查找后台收藏信息,改变activeKey：
    findCollectAPI(username,id){
        return(dispatch,getState)=>{
            getCollect(username).then(res=>{
                let {code,lists}=res;
                if(code===0){
                    let info= lists.find(item=>item.recommendID===id);
                    if(info){
                        //收藏信息里有这个id的信息
                        dispatch({
                            type:Types.FIND_COLLECT,
                            activeKey:info.collect,
                            lists,
                        });
                    }else{//收藏信息里没有这个id的信息
                        dispatch({
                            type:Types.FIND_COLLECT,
                            activeKey:false,
                            lists,
                        });
                    }
                }
            })
        }
    },


};
export default actions;