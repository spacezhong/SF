import React,{memo,useEffect}from 'react';
import './index.less';
import {NavLink,withRouter} from 'react-router-dom';
import {connect,useSelector,useDispatch,shallowEqual} from 'react-redux';
import actions1 from '../../redux/actions/bottomBar';
import actions2,{getCartAPI,validateAPI} from '../../redux/actions/cart';

class BottomBar extends React.Component{
     componentDidMount() {
         let {username,getCartAPI,validateAPI}=this.props;
         if(username){
             getCartAPI(username);
         };
     };
     render(){
        let {username}=this.props;
        return (
            <div className="bottom-bar">
                <NavLink to='/home' exact className='btn-item'>
                    <i className='iconfont icon-shouye'></i>
                     <div className="btn-name">首页</div>
                </NavLink>
                <NavLink to='/kind' className='btn-item'>
                    <i className='iconfont icon-fenlei'></i>
                    <div className="btn-name">分类</div>
                </NavLink>
                <NavLink to={{pathname:`/cart`,state:username}} className='btn-item'>
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
export default withRouter(connect(state=>({...state.personal}),{...actions1,...actions2})(BottomBar));

/*function BottomBar(props){

    const {username}=useSelector(state=>({
        ...state.personal
    }),shallowEqual);
   /!* const dispatch=useDispatch();
    useEffect(()=>{
        if(username){
            dispatch(getCartAPI(username));
        };
    },[username]);*!/

    return(
        <div className="bottom-bar">
            <NavLink to='/home'  className='btn-item'>
                <i className='iconfont icon-shouye'></i>
                <div className="btn-name">首页</div>
            </NavLink>
            <NavLink to='/kind' className='btn-item'>
                <i className='iconfont icon-fenlei'></i>
                <div className="btn-name">分类</div>
            </NavLink>
            <NavLink to={{pathname:'/cart',state:username}} className='btn-item'>
                <i className='iconfont icon-cart'></i>
                <div className="btn-name">购物车</div>
            </NavLink>
            <NavLink to='/personal' className='btn-item'>
                <i className='iconfont icon-gerenzhongxin'></i>
                <div className="btn-name">个人中心</div>
            </NavLink>
        </div>
    )
};
export default memo(withRouter(BottomBar));*/
