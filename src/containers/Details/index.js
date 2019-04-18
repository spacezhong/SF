import React, {Component} from "react";
import {Link} from 'react-router-dom'
import './index.less'
import Header from "./Header/index";
import Sliders from "./Sliders/index";
import DetailFooter from "./DetailFooter";
import {connect} from 'react-redux'
import actions from '../../store/actions/details'
class Details extends Component {
    constructor() {
        super();
        this.state = {num: 1,  isShow: false}
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.detailInfo(id)
    }

    handleClick = (event, type) => {
        let num = parseInt(this.goodNum.placeholder);
        if (type == 'add') {
            num++
            this.setState({num})
        } else if (type == 'sub') {
            num--
            if (num <= 0) {
                num = 1
            }
            this.setState({num})
        }
    };

    render() {
        //客户评论列表
        let comments = this.props.comment.text;
        //商品录播图列表
        let img = this.props.details.graphicImg ? this.props.details.graphicImg : [this.props.details.recommendImg];
        return (
            <div className="detail">
                <Header id={this.props.details.recommendID}/>
                <div className="product" ref='scroll'>
                    <div>
                        <Sliders imgs={img}/>
                        <div className="productInfo">
                            <h1>
                                <span>自营</span>
                                {this.props.details.recommendTitle}
                            </h1>
                            <div className="price">
                                <span>￥<em>{this.props.details.recommendPrice}</em>.00</span>
                            </div>
                            <div className="goods-info">
                                <ul className="goods-from">
                                    {
                                        this.props.details.graphicOrigin ?
                                            <li>产地：{this.props.details.graphicOrigin}</li> :
                                            <li>产地：不详</li>
                                    }
                                    {
                                        this.props.details.graphicBrand ?
                                            <li>品牌：{this.props.details.graphicBrand}</li> :
                                            <li>品牌：不详</li>
                                    }
                                    {
                                        this.props.details.graphicSpecification ?
                                            <li>规格：{this.props.details.graphicSpecification}</li> : <li>规格：不详</li>
                                    }
                                </ul>
                            </div>
                            <div className="promotion">
                                <span>促销</span>
                                <div className="score">
                                    <span>2.0倍积分</span>指定商品下单后即可得2.0倍积分
                                </div>
                                <i></i>
                            </div>
                            <div className="delivery">
                                <div className="address">
                                    <span>送至</span>
                                    <p >北京东城区</p>
                                    <p>由顺丰优选发货，并提供售后服务。如果您在10:30前下单，预计12月15日为您送达！</p>
                                </div>
                                <div className="goods-num">
                                    <span>数量</span>
                                    <div className="goods-nums">
                                        <i onClick={(event) => {
                                            this.handleClick(event, 'add')
                                        }} className="add"></i>
                                        <input ref={input =>
                                            this.goodNum = input} type="text"
                                               placeholder={this.state.num}/>
                                        <i onClick={(event) => {
                                            this.handleClick(event, 'sub')
                                        }} href="javascript:void(0);"
                                           className={this.state.fade ? "sub fade" : "sub"}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="userComments">
                                <div className="bar">
                                    <Link to={"/comments/" + this.props.details.recommendID}>
                                        <h1 className=".clearfix:after {
"><span>用户评价 ({comments ? comments.length : 0}条)</span></h1>
                                        <i className="ico-loadmore"></i></Link>
                                </div>
                                <ul>
                                    {
                                        comments ? (
                                            <li>
                                                <p>{comments[0].content}</p>
                                                <h1><em>{comments[0].user}</em><i>{comments[0].time}</i></h1>
                                            </li>
                                        ) : <p>暂无评价</p>
                                    }
                                </ul>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <DetailFooter num={this.state.num} img={img[0]}/>
            </div>
        )
    }
}
export default connect(
    state => state.detail,
    actions,
)(Details)
