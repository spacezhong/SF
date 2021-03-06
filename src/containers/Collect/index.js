import React,{memo,useEffect} from 'react';
import './index.less';
import {connect,useSelector,shallowEqual,useDispatch} from 'react-redux';
import actions,{getCollectAPI} from '../../redux/actions/collect';
import HeaderBar from '../../components/HeaderBar';
import {Link} from 'react-router-dom';

class Collect extends React.Component{
    componentDidMount() {
        let username=this.props.username;
        this.props.getCollectAPI(username);
    };
    render(){
        let {lists,error}=this.props;
        return(
            <div className="collect">
                <HeaderBar title='我的收藏'/>
                <div className="collect__content">
                    {
                        !this.props.error?lists.map(item=>{
                            return(
                                <Link to={`/detail/${item.recommendID}`} className="collect__Item" key={item.recommendID}>
                                    <img src={item.recommendImg} alt="" className='collect__left'/>
                                    <div className="collect__right">
                                        <div className="collect__title">{item.recommendTitle}</div>
                                        <div className="collect__price">￥{item.recommendPrice}</div>
                                    </div>
                                </Link>
                            )
                        }):<div className='collect__error'>{this.props.error}</div>
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({...state.personal,...state.collect}),
    actions
)(Collect);

/*
function Collect(){
    const {lists,error,username}=useSelector(state=>({
        ...state.personal,
        ...state.collect
    }),shallowEqual);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getCollectAPI(username));
    },[username]);

    return(
        <div className="collect">
            <HeaderBar title='我的收藏'/>
            <div className="collect__content">
                {
                    !error?lists.map(item=>{
                        return(
                            <Link to={`/detail/${item.recommendID}`} className="collect__Item" key={item.recommendID}>
                                <img src={item.recommendImg} alt="" className='collect__left'/>
                                <div className="collect__right">
                                    <div className="collect__title">{item.recommendTitle}</div>
                                    <div className="collect__price">￥{item.recommendPrice}</div>
                                </div>
                            </Link>
                        )
                    }):<div className='collect__error'>{error}</div>
                }
            </div>
        </div>
        )
};
export default memo(Collect);*/
