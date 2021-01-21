import React, {memo,Component,useEffect} from 'react';
import './index.less';
import {Link,withRouter} from 'react-router-dom';
import actions,{clearErrorAPI,loginAPI} from '../../redux/actions/personal';
import {connect, useSelector,useDispatch} from 'react-redux';

class Login extends Component {

    componentWillUnmount() {
        this.username.value='';
        this.password.value='';
        this.props.clearErrorAPI();
    }

    handleClick=()=>{
        let username=this.username.value;
        let password=this.password.value;
        this.props.loginAPI({
            username,
            password
        });
    };
    render() {
        return (
            <div className="log">
                <div className="log-header">
                    <i onClick={()=>this.props.history.goBack()}>&lt;</i>
                    顺丰优选登录
                </div>
                <input  type="text" placeholder="请输入用户名(大小写字母开头，任意5-8位)" className="input"
                        ref={ref=>this.username=ref}
                />
                <input  type="password" placeholder="请输入密码(任意6-8位大小写字母，数字，_)" className="input"
                        ref={ref=>this.password=ref}
                />
                <div
                    className="log-btn"
                    onClick={this.handleClick}
                >
                    登&nbsp;录
                </div>
                <div className="quick-log">
                    <Link to="/reg">快速注册</Link>
                </div>
                {this.props.errorLogin?<div className="login-warn">{this.props.errorLogin}</div>:null}
            </div>
        )
    }
}
export default withRouter(connect(
    state=>({...state.personal}),
    actions
)(Login));


/*function Login(props){
    const username=React.useRef();
    const password=React.useRef();
    const {errorLogin,}=useSelector(state=>({
        ...state.personal,
    }));
    const dispatch=useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(clearErrorAPI());
        }
    },[dispatch]);
    const handleClick=()=>{
        let username=username.current.value;
        let password=password.current.value;
        dispatch(loginAPI({
            username,
            password,
        }));
        username='';
        password='';
    };
    return(
        <div className="log">
            <div className="log-header">
                <i onClick={()=>props.history.goBack()}>&lt;</i>
                顺丰优选登录
            </div>
            <input  type="text" placeholder="请输入用户名(大小写字母开头，任意5-8位)" className="input"
                    ref={username}
            />
            <input  type="password" placeholder="请输入密码(任意6-8位大小写字母，数字，_)" className="input"
                    ref={password}
            />
            <div
                className="log-btn"
                onClick={handleClick}
            >
                登&nbsp;录
            </div>
            <div className="quick-log">
                <Link to="/reg">快速注册</Link>
            </div>
            {errorLogin?<div className="login-warn">{errorLogin}</div>:null}
        </div>
        )
};
export default memo(Login);*/
