import React, {Component} from "react";
import './index.less';
import {withRouter} from 'react-router-dom'
export default class OrderList extends Component {
    render() {
        return (
            <div className="personal">
                <div className="head">
                    <span><i onClick={()=>this.props.history.goBack()}></i>确认订单</span>
                </div>
                <div className="order">
                    <div className="or-info">
                        <span><i className="iconfont icon-peisongzhong"></i>
                                您还没有确认收货人信息<i className="spe">请添加</i>
                            </span>
                    </div>
                </div>
                <ul className="person-info">
                    <div className="info-my"></div>
                    <li>支付方式： <i>在线支付</i></li>
                    <li>配送方式：<i>顺丰速运</i></li>
                    <li>免邮费<i>0张可用</i></li>
                    <li>优惠券<i>0张可用</i></li>
                    <li>优选单优惠<i>&gt;</i></li>
                    <li>优选卡<i>&gt;</i></li>
                    <li className="fontColor">余额$0.00</li>
                    <li>使用积分<i>&gt;</i></li>
                    <li className="fontColor">顺丰优选：100积分 可低0.5$<i>本次使用<input type="text"/>元</i>
                        </li>
                </ul>
                <div className="detailFooter">
                    <a href="javascript:void(0);">
                        <span>应付金额:  <em>99$</em></span>
                    </a>
                    <a href="javascript:void(0);">
                        <span onClick={this.handleClick}>提交</span>
                    </a>
                </div>
            </div>
        )
    }
}
