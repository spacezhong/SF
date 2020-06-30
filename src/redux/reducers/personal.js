import * as types from '../action-types';

const initState={
        username:'',
        password:'',
        errorLogin:'',
        errorReg:'',
        validateError:'',
        success:'',
        msg:'',//修改密码组件两次新密码不一致的信息
};
const reducer=(state=initState,action)=>{
    switch(action.type){
        case types.FETCH_REG_FAIL:
            return {
                ...state,
                errorReg:action.error,
            };
        case types.FETCH_LOGIN:
            return {
                ...state,
                ...action.payload,//username:xxx,password:1111,
            };
        case types.FETCH_VALIDATE:
            return {
                ...state,
                username:action.payload.username,
                password:action.payload.password,
            };
        case types.FETCH_VALIDATE_FAIL:
            return {
                ...state,
                validateError:action.payload
            };
        case types.CLEAR_APPEAR:
            return {
                ...state,
                errorLogin:'',
                errorReg:''
            };

        case types.FETCH_LOGIN_FAIL:
            return {
                ...state,
                errorLogin:action.payload,
            };
        case types.CHANGE_TWOPASSWORDS_ERROR:
            return {
                ...state,
                msg:action.msg,
            };
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                username:action.payload.username,
                password:action.payload.password,
            };
        case types.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                error:action.error,
            };
        case types.FETCH_LOGINOUT_SUCCESS:
            return {
                ...state,
                success:action.payload,
                username:'',
                password:'',
                error:'',
            };
        case types.WRITE_OFF_SUCCESS:
            return {
                ...state,
                success:action.payload,
                username:'',
                password:'',
                error:'',
            };
        default:
            return state
    }
};
export default reducer;