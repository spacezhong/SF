import React,{memo} from 'react';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import actions,{getHotSearchAPI,getSearchHistoryAPI,searchAPI} from '../../redux/actions/search';
import {Link} from 'react-router-dom';
import './index.less';

class Search extends React.Component{

    componentDidMount() {
        this.input.focus();
        this.props.getHotSearchAPI();//获取热门搜索内容
        this.props.getSearchHistoryAPI();//获取搜索历史记录
    }
    handleKeyDown=(e)=>{//这个事件的作用是调用获取home页面中主要数据包含有输入搜索框值的想的值的api,
        //获取到数据后，将数据存在redux中；
        if(e.keyCode===13){
            let value=this.input.value;
            this.props.searchAPI(value);//第一次去获取搜索相关的内容，因为如果后台返回的是
            //“无相关内容“这个数据的话，需要在页面上展示出来，所以必须先去后台获取一次；
            this.input.value='';
        }
    };
    handleHotClick=(e)=>{
        let value=e.target.innerText;
        this.props.searchAPI(value);
    };
    handleClick=()=>{
        this.props.getSearchHistoryAPI('empty');//跟获取搜索历史记录是同一个api,只不过需要传入一个实参
    };
    handleHistoryClick=(e)=>{
        let value=e.target.innerText;
        this.props.searchAPI(value);
    };
    render(){
        let search=this.props.search.listData?this.props.search.listData:{};
        let code=search.code;
        let noMatchMsg=search.err;
        let matchMsg=search.success;
        let searchHot=this.props.searchHot.data?this.props.searchHot.data:{};//判断到state的data属性为止
        let dataSource=searchHot.searchHotData || [];
        let searchHistory=this.props.searchHistory.data?this.props.searchHistory.data:{};//判断到state的data属性为止
        let historyData=searchHistory.data || [];

        return(
            <div className='search'>
                <div className="search-inner">
                    <div className="search-top">
                        <i className="iconfont icon-sousuo1 search-pic"></i>
                        <input type="text"
                               placeholder='搜一搜'
                               className='search-input'
                               ref={ref=>this.input=ref}
                               onKeyDown={this.handleKeyDown}
                        />
                        <Link to='/home' exact='true' className="search-cancel">取消</Link>
                    </div>
                    {
                        code===1?<div className="search-noMatch">{noMatchMsg}</div>:null
                    }
                    <div className="search-middle">
                        <div className="search-hot-title">热门搜索</div>
                        <div className="search-hot-content clearfix">
                            {
                                dataSource.map((item,index)=>{
                                    return(
                                        <div className="search-hot-item"
                                             key={index}
                                             onClick={this.handleHotClick}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="search-footer ">
                        <div className="search-history clearfix">
                            <div className="search-history-title">搜索历史</div>
                            <div className="search-history-cancel" onClick={this.handleClick}>清空</div>
                        </div>
                        <div className="search-history-content clearfix">
                            {
                                historyData.map((item,index)=>{
                                    return(
                                        <div
                                            className="search-history-item"
                                            key={index}
                                            onClick={this.handleHistoryClick}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state)=>({...state.searchTotal}),actions)(Search);

/*function Search(){
    const inputRef=React.useRef();
    const {
        search:{listData:{code,err,success}}={},
        searchHot,
        searchHistory,
    }=useSelector(state=>({
        ...state.searchTotal
    }),shallowEqual);
    const dispatch=useDispatch();
    let noMatchMsg=err;
    let matchMsg=success;
    let dataSource=searchHot.data?searchHot.data.searchHotData:[];
    let searchHistoryData=searchHistory.data?searchHistory.data:{};//判断到state的data属性为止
    let historyData=searchHistoryData.data || [];

    const handleKeyDown=(e)=>{//这个事件的作用是调用获取home页面中主要数据包含有输入搜索框值的想的值的api,
        //获取到数据后，将数据存在redux中；
        if(e.keyCode===13){
            let value=inputRef.current.value;
            dispatch(searchAPI(value));
            //第一次去获取搜索相关的内容，因为如果后台返回的是
            //“无相关内容“这个数据的话，需要在页面上展示出来，所以必须先去后台获取一次；
            value='';
        }
    };
    const handleHotClick=(e)=>{
        let value=e.target.innerText;
        dispatch(searchAPI(value));
    };
    const handleClick=()=>{
        dispatch(getSearchHistoryAPI('empty'));
        //跟获取搜索历史记录是同一个api,只不过需要传入一个实参
    };
    const handleHistoryClick=(e)=>{
        let value=e.target.innerText;
        dispatch(searchAPI(value));
    };

    return(
        <div className='search'>
            <div className="search-inner">
                <div className="search-top">
                    <i className="iconfont icon-sousuo1 search-pic"></i>
                    <input type="text"
                           placeholder='搜一搜'
                           className='search-input'
                           ref={inputRef}
                           onKeyDown={handleKeyDown}
                    />
                    <Link to='/' exact='true' className="search-cancel">取消</Link>
                </div>
                {
                    code===1?<div className="search-noMatch">{noMatchMsg}</div>:null
                }
                <div className="search-middle">
                    <div className="search-hot-title">热门搜索</div>
                    <div className="search-hot-content clearfix">
                        {
                            dataSource.map((item,index)=>{
                                return(
                                    <div className="search-hot-item"
                                         key={index}
                                         onClick={handleHotClick}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="search-footer ">
                    <div className="search-history clearfix">
                        <div className="search-history-title">搜索历史</div>
                        <div className="search-history-cancel" onClick={handleClick}>清空</div>
                    </div>
                    <div className="search-history-content clearfix">
                        {
                            historyData.map((item,index)=>{
                                return(
                                    <div
                                        className="search-history-item"
                                        key={index}
                                        onClick={handleHistoryClick}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        )
};
export default memo(Search);*/
