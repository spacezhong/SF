
import * as types from '../action-types';
import {reg, login, logout, validateUser, changepassword} from '../../api/personal';
import {push} from 'react-router-redux'
export default {
    //注册

    reg(user){
        return function (dispatch, getState) {
            reg(user).then(result => {
                let {code, success, error} = result;
                dispatch({
                    type: types.REG,
                    payload: {success, error}
                });
                if (code == 0) {
                    dispatch(push('/login'));
                }
            })
        }
    },
    //登录
    login(user){
        return function (dispatch, getState) {
            login(user).then(result => {
                let {code, success, error, user} = result;
                dispatch({
                    type: types.LOGIN,
                    payload: {success, error, user}
                });
                if (code === 0) {
                    dispatch(push('/personal'));
                }
            })
        }
    },
    //退出
    logout(){
        return function (dispatch, getState) {
            logout().then(result => {
                let {code, success, error} = result;
                dispatch({
                    type: types.LOGOUT,
                    payload: {success, error}
                });
                dispatch(push('/login'));
            })
        }
    },
    clearMessages(){
        return {
            type: types.CLEARMESSAGE
        }
    },
    // //判断有没有登录
    validate(){
        return function (dispatch, getState) {
            validateUser().then(result => {
                let {code, success, error, user} = result;
                dispatch({
                    type: types.VALIDATE,
                    payload: user
                });
            });
        }
    },
    //修改
    changepassword({user,newpassword}){
        return function (dispatch, getState) {
            changepassword({user,newpassword}).then(result => {
                let {code, success, error, user} = result;
                dispatch({
                    type: types.CHANGEPASSWORD,
                    payload: {success, error, user}
                });
                if (code == 0) {
                    dispatch(push('/login'));
                }
            })
        }
    }
}