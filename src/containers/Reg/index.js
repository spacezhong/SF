import React,{Component} from 'react';
import './index.less';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../redux/actions/personal'

class Reg extends Component{
    componentWillUnmount() {
       this.username.value='';
       this.password.value='';
       this.props.clearErrorAPI();
    }
    handleClick=()=>{
        let username=this.username.value;
        let password=this.password.value;
        let usertest=/^[a-zA-z]\w{4,7}$/;
        let pastest=/^\w{6,8}$/;
        if(usertest.test(username)&&pastest.test(password)){
            this.props.regAPI({username,password})
        };
    };
  render(){
    return (
      <div className="reg">
          <div className="reg-header">
              <i  onClick={()=>this.props.history.goBack(-1)}> &lt;</i>
              优选注册
          </div>
          <input  ref={ref=>this.username=ref} type="text" placeholder="请输入用户名(大小写字母开头，任意5-8位)" className="reg_input"/>
          <input  ref={ref=>this.password=ref} type="password" placeholder="请输入密码(任意6-8位大小写字母，数字，_)" className="reg_input"/>
          <div className="reg-btn" onClick={this.handleClick}>注册</div>
          {this.props.errorReg?<div className="reg-warn">{this.props.errorReg}</div>:null}
          <div className="reg-footer">
              注册遇到问题?
              <Link to="">联系客服</Link> <br/>
              <div className="reg-mes">
                  注册即视为同意<span>顺丰优选注册协议</span>
              </div>
          </div>
      </div>
    )
  }
}
export default withRouter(connect((state)=>({...state.personal}),actions)(Reg));