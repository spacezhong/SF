import React, {Component} from 'react';
import './index.less';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import actions from '../../redux/actions/personal';


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
        console.log(this.props);
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
)(Change))