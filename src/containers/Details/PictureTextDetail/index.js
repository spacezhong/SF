import React, {Component} from 'react'
import './index.less'
import {connect} from 'react-redux'
import actions from '../../../store/actions/details'
class PictureTextDetail extends Component {
    render() {
        let img = [];
        if (this.props.details.graphicDescription) {
            img.push(this.props.details.graphicDescription);
            if (this.props.details.graphicPriceDescription) {
                img.push(this.props.details.graphicDescription)
            }
        }
        return (
            <div className="pictureText">
                <div className="head">图文详情<i className="iconfont icon-fanhui" onClick={()=>{this.props.history.goBack()}}></i></div>
                <ul>
                    {
                        img.length === 0?(<li>暂无图文详情</li>):
                        img.map((item, index) => (
                            <li key={index}><img src={item} alt="图文不存在"/></li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
export default connect(
    state => state.detail,
    actions,
)(PictureTextDetail)
