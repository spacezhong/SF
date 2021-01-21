import * as types from '../action-types';
import {reg,login,validate,changPassword,loginOut,writeOff} from '../../api/personal';
import {push} from 'react-router-redux';

const actions={
    //注册：
    regAPI({username,password}){
        return function (dispatch, getState) {
            reg({username,password}).then(result => {
                let {code,success,error}=result;
                if(code===0){//如果注册成功,就直接跳登录页
                    dispatch(push('/login'));
                }else{
                    dispatch({
                        type:types.FETCH_REG_FAIL,
                        error:error,
                    });
                }
            })
        }
    },
    //组件卸载时，清空state里的error
    clearErrorAPI(){
        return (dispatch,getState)=>{
            dispatch({
                type:types.CLEAR_APPEAR,
                errorReg:'',
                errorLogin:'',
            })
        }
    },
    //登录：
    loginAPI({username, password}){
        return (dispatch,getState)=>{
            login({username, password}).then(res=>{
                let {code,error,success,user}=res;
                if(code===0){
                    dispatch({
                        type:types.FETCH_LOGIN,
                        payload:user,
                    });
                    dispatch(push('/personal'))
                }else{
                    dispatch({
                        type:types.FETCH_LOGIN_FAIL,
                        payload:error
                    })
                }
            });

        }
    },
    //向后台发送请求，在后台判断是否登录：
    validateAPI(){
        return (dispatch,getState)=>{
            validate().then(res=>{
                let {code,success,user,error}=res;
                if(code===0){
                    dispatch({
                        type:types.FETCH_VALIDATE,
                        payload:user,
                        //{code:0,success:"用户已登录",user:req.session.user}
                        //{code:1,error:"此用户未登录"}
                    })
                }else{
                    dispatch({
                        type:types.FETCH_VALIDATE_FAIL,
                        payload:error
                    })
                }
            });
        }
    },
    //修改密码：
    changPasswordAPI({username,password,newPasswordFirst}){
        return (dispatch,getState)=>{
            changPassword({username,password,newPasswordFirst}).then(res=>{
                let {code,success,error,username,password}=res;//{code:0,success:'修改密码成功',username,password:newPasswordFirst}
                if(code===0){
                    dispatch({
                        type:types.CHANGE_PASSWORD_SUCCESS,
                        payload:{username,password},
                    });
                    dispatch(push('/personal'));
                }else{
                    dispatch({
                        type:types.CHANGE_PASSWORD_FAIL,
                        error:error,
                    });
                }
            });
        }
    },
    //修改密码组件两次新密码不一致的信息：
    twoNewPasswordsError(){
        return(dispatch,getState)=>{
            dispatch({
                type:types.CHANGE_TWOPASSWORDS_ERROR,
                msg:'两次新密码不一致'
            })
        }
    },
    //退出登录：
    loginOutAPI(){
        return(dispatch,getState)=>{
            loginOut().then(res=>{
                let {code,success}=res;
                dispatch({
                    type:types.FETCH_LOGINOUT_SUCCESS,
                    payload:success,
                })
            })
        }
    },
    //注销：
    writeOffAPI({username,password}){
        return(dispatch,getState)=>{
            writeOff({username,password}).then(res=>{
                let {code,success}=res;
                dispatch({
                    type:types.WRITE_OFF_SUCCESS,
                    payload:success,
                })
            })
        }
    }
};
export default actions;