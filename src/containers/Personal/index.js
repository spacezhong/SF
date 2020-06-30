import React, {Component} from "react";
import './index.less';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import actions1 from '../../redux/actions/personal';
import actions2 from '../../redux/actions/detail';

class Personal extends Component {

    componentDidMount() {
        this.props.validateAPI();
    };
    handleClickOut=()=>{//退出登录
      this.props.loginOutAPI();
      this.props.clearGoodsNum();
    };
    writeOff=({username,password})=>{//注销
        this.props.writeOffAPI({username,password});//清空该用户的注册信息
        this.props.writeOffCartAPI(username);//清空该用户的购物车信息
    };
    render() {
        let username=this.props.username;
        let password=this.props.password;
        return (
            <div className="personal">
                <div className="login">
                    {
                        (this.props.username)?<span className="login-btn">{this.props.username}</span>:<Link to='/login' className="login-btn">登录</Link>
                    }
                </div>
                <div className="order">
                    &nbsp;我的优选订单
                    {
                        this.props.username?<Link to={{pathname:`/cart`,state:this.props.username}} className="all-or">全部订单<i className="spe">&gt;</i></Link>:null
                    }
                    <div className="or-info">
                            <span>
                                <i className="iconfont icon-weibiaoti2fuzhi04"></i>
                                <br/>
                                待付款
                            </span>
                        <span><i className="iconfont icon-peisongzhong"></i>
                                <br/>
                                配送中
                            </span>
                        <span><i className="iconfont icon-daipingjia"></i>
                                <br/>
                                待评价
                            </span>
                        <span><i className="iconfont icon-tuikuan"></i>
                                <br/>
                                退款/售后
                            </span>
                    </div>
                </div>
                <ul className="person-info">
                    <div className="info-my">我的优选信息</div>
                    <li><i className="iconfont icon-dizhiguanli spe2"></i>我的地址 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-huiyuan spe2"></i>优选会员 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-mendian2 spe2"></i>我的门店 <i className="spe1">&gt;</i></li>
                    <li>
                        <Link to={{pathname:'/collect',state:username}}>
                            <i className="iconfont icon-shoucang1 spe2"></i>我的收藏 <i className="spe1">&gt;</i>
                        </Link>
                    </li>
                    <li><i className="iconfont icon-liulanlishi1 spe2"></i>历史浏览 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-anquanzhongxin spe2"></i>安全中心 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-kefu1 spe2"></i>客服热线 <i className="spe1">&gt;</i></li>
                    {
                        this.props.username?<li><i className="iconfont icon-kefu1 spe2"></i>修改密码 <Link to='/changepassword' className="spe1">&gt;</Link>
                        </li>
                            :null
                    }
                    {
                        this.props.username? <li className="logout" ><i className="iconfont icon-kefu1 spe2"></i>退出登录 <i className="spe1"
                                   onClick={this.handleClickOut}
                                >&gt;</i></li>
                            :null
                    }
                    {
                        this.props.username? <li className="logout" ><i className="iconfont icon-kefu1 spe2"></i>注销 <i className="spe3" onClick={()=>{this.writeOff({username,password})}}>&gt;</i>
                        </li>
                            :null
                    }
                </ul>
            </div>
        )
    }
}
export default connect(
    state=>({...state.personal,...state.detail}),
    ({...actions1,...actions2})
)(Personal);