import React, {Component} from "react";
import './index.less';
import {connect} from 'react-redux';
import actions from '../../store/actions/personal';
import {Link} from 'react-router-dom';
class Personal extends Component {
    handleLogout=()=>{
        this.props.logout();
    };
    componentDidMount(){
        this.props.validate();
    }
    render() {
        return (
            <div className="personal">
                <div className="login">
                    {
                        this.props.username?<span className="login-btn">{this.props.username}</span>:<Link to='/login' className="login-btn">登录</Link>
                    }
                </div>
                <div className="order">
                    我的优选订单
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
                    <li><i className="iconfont icon-shoucang1 spe2"></i>我的收藏 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-liulanlishi1 spe2"></i>历史浏览 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-anquanzhongxin spe2"></i>安全中心 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-kefu1 spe2"></i>客服热线 <i className="spe1">&gt;</i></li>
                    <li><i className="iconfont icon-kefu1 spe2"></i><Link to='/changepassword'>修改密码</Link> <i className="spe1">&gt;</i></li>
                    <li className="logout" onClick={this.handleLogout}><i className="iconfont icon-kefu1 spe2"></i>退出登录<i className="spe1">&gt;</i></li>
                </ul>
            </div>
        )
    }
}
export default connect(
    state=>state.personal,
    actions
)(Personal)