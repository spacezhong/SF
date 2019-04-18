import React, {Component} from 'react';
import './index.less';
import {connect} from 'react-redux';
import actions from '../../store/actions/personal';

import Alert from '../../components/Alert';
class Change extends Component {
    constructor() {
        super();
        this.state = {msg: ''};
    }

    handleChange = () => {
        let password = this.password.value;
        let newpassword = this.newpassword.value;
        let newpasswordFirst = this.newpasswordFirst.value;
        let pdtest = /^(\w){6,8}$/;
        if (newpassword===newpasswordFirst) {
            if (pdtest.test(newpassword)){
                let user={username:this.props.username,password}
                this.props.changepassword({user,newpassword});
            }
        }else{
            this.setState({msg:'两次输入的新密码不一致'});
        }
    };
    render() {
        console.log(this.props);
        return (
            <div className="reg">
                <div className="reg-header">
                    <i onClick={() => this.props.history.goBack()}>&lt;</i>
                    修改密码
                </div>
                <input ref={input => this.password = input} type="text" placeholder="请输入原始密码" className="input"/>
                <input ref={input => this.newpassword = input} type="text" placeholder="请输入新密码" className="input"/>
                <input ref={input => this.newpasswordFirst = input} type="text" placeholder="请再次输入密码" className="input"/>
                <div className="reg-btn" onClick={this.handleChange}>确认修改</div>
                <div className="reg-warn">{this.state.msg}</div>
                <Alert></Alert>
            </div>
        )
    }
}
export default connect(
    state => state.personal,
    actions
)(Change)