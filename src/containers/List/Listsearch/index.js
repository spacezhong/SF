import React,{Component} from 'react';
import {Route, Link} from "react-router-dom"
import './index.less'
export default class ListSearch extends Component{
    render(){
        return(
            <div className='searchList'>
                <i className="iconfont icon-sousuo1"></i>
                <Link to="/search">
                    <input placeholder='搜索优选商品'
                           type="text"/>
                </Link>
            </div>

    )
    }
}
