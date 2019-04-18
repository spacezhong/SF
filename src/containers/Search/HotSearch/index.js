import React,{Component} from "react";
import "./index.less"
//热门搜索
export default class HotSearch extends Component{
    handleHotSearch=(searchData)=>(
        searchData.map((item,index)=>(
            <li key={index} className="hot-list-item">
                {this.props.searchFlag&&<b>{index+1}</b>}
                <span onClick={()=>this.props.fetchSearch(item)}>{item}</span>
            </li>
        ))
    );
    render(){
        return(
            <div>
                <ul className="hot-list">
                    {

                        this.props.hotSearch&&this.handleHotSearch(this.props.hotSearch)
                    }
                </ul>
                {(!this.props.searchFlag&&this.props.hotSearch&&this.props.hotSearch.length>0)&&<div className="search-empty"
                 onClick={()=>this.props.fetchHistorical("empty")}
                >清空历史记录</div>}
            </div>
        )
    }
}