import React,{Component} from "react";
import "./index.less";
import {NavLink} from "react-router-dom";
import actions from '../../store/actions/personal';
import {connect} from 'react-redux';
class Tab extends Component{
    componentDidMount(){
        this.props.validate();
    }
    render(){
        return(
                <nav className="footer">
                    <NavLink exact to="/">
                        <i className="iconfont icon-shouye">
                        </i>
                        <span>首页</span>
                    </NavLink>
                    <NavLink to="/list">
                        <i className="iconfont icon-fenlei">
                        </i>
                        <span>分类</span>
                    </NavLink>
                    <NavLink to={{pathname:`/cart`,state:this.props.username}}>
                        <i className="iconfont icon-cart">
                         </i>
                        <span>购物车</span>
                    </NavLink>
                    <NavLink to="/personal">
                        <i className="iconfont icon-gerenzhongxin">
                        </i>
                        <span>我的优选</span>
                    </NavLink>
                </nav>
        )
    }
}
export default connect(
    state=>state.personal,
    actions
)(Tab)