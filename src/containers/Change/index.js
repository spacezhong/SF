import React, {memo,Component} from 'react';
import './index.less';
import {connect,useSelector,shallowEqual,useDispatch} from 'react-redux';
import {withRouter} from "react-router-dom";
import actions,{changPasswordAPI,twoNewPasswordsError} from '../../redux/actions/personal';

class Change extends Component {
    componentWillUnmount() {
       this.password.value='';
       this.newPasswordFirst.value='';
       this.newPasswordSecond.value='';
    };
    handleClick=()=>{
        let password=this.password.value;
        let newPasswordFirst=this.newPasswordFirst.value;
        let newPasswordSecond=this.newPasswordSecond.value;
        let pastest=/^\w{6,8}$/;
        let username=this.props.username;
        if(newPasswordFirst===newPasswordSecond){
            if(pastest.test(password)&&pastest.test(newPasswordFirst)){
                this.props.changPasswordAPI({username,password,newPasswordFirst});
            }
        }else{
            this.props.twoNewPasswordsError();
        }
    };
    render() {
        return (
            <div className="reg">
                <div className="reg-header">
                    <i onClick={()=>this.props.history.goBack(-1)}>&lt;</i>
                    修改密码
                </div>
                <input ref={input => this.password = input} type="password" placeholder="请输入原始密码" className="input"/>
                <input ref={input => this.newPasswordFirst= input} type="password" placeholder="请输入新密码" className="input"/>
                <input ref={input => this.newPasswordSecond = input} type="password" placeholder="请再次输入密码" className="input"/>
                <div className="reg-btn" onClick={this.handleClick}>确认修改</div>
                {
                    this.props.msg? <div className="reg-warn">{this.props.msg}</div>:null
                }
                {
                    this.props.error? <div className="reg-warn">{this.props.error}</div>:null
                }
            </div>
        )
    }
}
export default withRouter(connect(
    state => state.personal,
    actions
)(Change));

/*function Change(props){
    const passwordInput=React.useRef();
    const newPasswordFirstInput=React.useRef();
    const newPasswordSecondInput=React.useRef();
    const {msg,error,username}=useSelector(state=>({
        ...state.personal
    }),shallowEqual);
    const dispatch=useDispatch();

    const handleClick=()=>{
        let password=passwordInput.current.value;
        let newPasswordFirst=newPasswordFirstInput.current.value;
        let newPasswordSecond=newPasswordSecondInput.current.value;
        let pastest=/^\w{6,8}$/;
        if(newPasswordFirst===newPasswordSecond){
            if(pastest.test(password)&&pastest.test(newPasswordFirst)){
                dispatch(changPasswordAPI({username,password,newPasswordFirst}));
                password='';
                newPasswordFirst='';
                newPasswordSecond='';
            };
        }else{
            dispatch(twoNewPasswordsError());
        };
    };
    return(
        <div className="reg">
            <div className="reg-header">
                <i onClick={()=>props.history.goBack(-1)}>&lt;</i>
                修改密码
            </div>
            <input ref={passwordInput} type="password" placeholder="请输入原始密码" className="input"/>
            <input ref={newPasswordFirstInput} type="password" placeholder="请输入新密码" className="input"/>
            <input ref={newPasswordSecondInput} type="password" placeholder="请再次输入密码" className="input"/>
            <div className="reg-btn" onClick={handleClick}>确认修改</div>
            {
                msg? <div className="reg-warn">{msg}</div>:null
            }
            {
                error? <div className="reg-warn">{error}</div>:null
            }
        </div>
        )
};
export default memo(withRouter(Change));*/
