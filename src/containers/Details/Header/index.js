import React, {Component} from "react";
import './index.less'
import {Link,withRouter} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <div className="detailHeader">
                <i className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></i>
                <a href="javascript:void(0);">
                    <span>商品</span>
                </a>
                <Link to={"/pictureTextDetail/"+this.props.id}>
                      <span>详情</span>
                </Link>
                <Link to={"/comments/"+this.props.id}>
                    <span>评价</span>
                </Link>
            </div>
        )
    }
}
export default withRouter(Header);