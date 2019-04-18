import React,{Component} from "react";
import "./index.less";
import {Link,withRouter} from 'react-router-dom'
class Header extends Component{
    render(){
        return(
            <div className="header">
                <i onClick={()=>this.props.history.goBack()} className="iconfont icon-fanhui"></i>
                <h4>{this.props.title}</h4>
            </div>
        )
    }
};
export default withRouter(Header);