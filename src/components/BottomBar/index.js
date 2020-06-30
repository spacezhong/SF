import React from 'react';
import './index.less';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../redux/actions/bottomBar';
import bottomBar from "../../redux/reducers/bottombar";

export default class BottomBar extends React.Component{
    render(){

        return (
            <div className="bottom-bar">
                <NavLink to='/' exact className='btn-item'>
                    <i className='iconfont icon-shouye'></i>
                    <div className="btn-name">首页</div>
                </NavLink>
                <NavLink to='/kind' className='btn-item'>
                    <i className='iconfont icon-fenlei'></i>
                    <div className="btn-name">分类</div>
                </NavLink>
                <NavLink to='/cart' className='btn-item'>
                    <i className='iconfont icon-cart'></i>
                    <div className="btn-name">购物车</div>
                </NavLink>
                <NavLink to='/personal' className='btn-item'>
                    <i className='iconfont icon-gerenzhongxin'></i>
                    <div className="btn-name">个人中心</div>
                </NavLink>
            </div>
        )
    }
};

/*
class BottomBar extends React.Component{
    handleClick=(e)=>{
        let doType=e.target.dataset.type;
        this.props.changeActive(doType);
    };
    render(){
        let cls1=(this.props.activeKey==='home')?'active':'';
        let cls2=(this.props.activeKey==='kind')?'active':'';
        let cls3=(this.props.activeKey==='category')?'active':'';
        let cls4=(this.props.activeKey==='personal')?'active':'';
        return(
            <div className="bottom-bar" >
                <Link to='/' exact='true' data-type='home'
                      className={cls1}
                      onClick={(e)=>{this.handleClick(e)}}
                >
                    <i className='iconfont icon-shouye'></i>
                    <span>首页</span>
                </Link>
                <Link to='/kind' data-type='kind' className={cls2}
                      onClick={(e)=>{this.handleClick(e)}}
                >
                    <i className='iconfont icon-fenlei'></i>
                    <span>分类</span>
                </Link>
                <Link to={{pathname:'/cart',state:this.props.username}}
                      data-type='category'
                      className={cls3}
                      onClick={(e)=>{this.handleClick(e)}}
                >
                    <i className='iconfont icon-cart'></i>
                    <span>购物车</span>
                </Link>
                <Link to='/personal' data-type='personal' className={cls4}
                      onClick={(e)=>{this.handleClick(e)}}
                >
                    <i className='iconfont icon-gerenzhongxin'></i>
                    <span>个人中心</span>
                </Link>
            </div>
        )
    }
}
export default connect(
    state=>({...state.personal,...state.bottomBar}),
    actions
)(BottomBar);*/
