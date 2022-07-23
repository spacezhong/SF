import React, {memo, useEffect} from 'react';
import './index.less';
import ListItem from '../ListItem';
import Loading from '../../../components/Loading';
import {shallowEqual, useSelector, useDispatch} from "react-redux";
import {listAPI, discountAPI, swipeAPI, categoryAPI, headlineAPI} from '../../../redux/actions/home';

function HomeLists(props) {
    const myRef = React.useRef();
    const {list} = useSelector(state => ({
        ...state.home,
    }), shallowEqual);
    let lists = list.data ? list.data : {};
    let dataSource = lists.listData ? lists.listData : [];
    let {loadingText} = lists;

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(listAPI());
    };
    return (
        <div className="homeLists" ref={myRef}>
            <div className="homeLists-title">推荐商品</div>
                <div className="homeLists-content clearfix">
                    {
                        dataSource.map((item, index) => {
                            return (
                                <ListItem itemData={item} key={index}/>
                            )
                        })
                    }
                </div>
                {
                    loadingText === '加载中'
                        ? <div onClick={handleClick} className='list-div'>点击加载更多</div>
                        : ''
                }
                <Loading loadingText={loadingText}/>
        </div>
    )
};
export default memo(HomeLists);

/*class HomeLists extends React.Component{

    constructor(props){
        super(props);
        this.myRef=React.createRef();
    };
    handleClick=()=>{
        this.props.listAPI();
    };

    render(){
        let {dataSource,loadingText}=this.props;
        return(
            <div className="homeLists" ref={this.myRef}>
                <div className="homeLists-title">推荐商品</div>
                <div className="homeLists-content clearfix">
                    {
                        dataSource.map((item,index)=>{
                            return (
                                <ListItem itemData={item} key={index}/>
                            )
                        })
                    }
                </div>
                {
                    this.props.loadingText==='加载中'
                        ?<div onClick={this.handleClick} className='list-div'>点击加载更多</div>
                        :''
                }
                <Loading loadingText={loadingText}/>
            </div>
        )
    }
}
export default HomeLists;*/

/* const handleScroll=()=>{
        let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;;
        let clientHeight=document.documentElement.clientHeight;
        let likeOffsetHeight=myRef.current.offsetHeight;
        let likeOffsetTop=myRef.current.offsetTop;
        //html.scrollTop+html.clientHeight>=元素.offsetTop+元素.offsetHeight;
        if(scrollTop+clientHeight>=likeOffsetHeight+likeOffsetTop){
            dispatch(listAPI());
        }
    };*/
