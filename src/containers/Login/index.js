import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import {Link} from 'react-router-dom';
import Alert from '../../components/Alert';
import actions from '../../store/actions/personal';
class Login extends Component {
    handleClick = () => {
        let username = this.username.value;
        let password = this.password.value;
        this.props.login({username, password});
    };
    render() {
        return (
            <div className="log">
                <div className="log-header">
                    <i onClick={() => this.props.history.goBack()}>&lt;</i>
                    顺丰优选登录
                </div>
                <input ref={input => this.username = input} type="text" placeholder="请输入手机号/邮箱/用户名" className="input"/>
                <input ref={input => this.password = input} type="password" placeholder="请输入密码" className="input"/>
                <div
                    onClick={this.handleClick}
                    className="log-btn">登&nbsp;录
                </div>
                <div className="quick-log">
                    <Link to="/reg">快速注册</Link>
                </div>
                <Alert></Alert>
            </div>
        )
    }
}
export default connect(
    state => state.personal,
    actions
)(Login)
