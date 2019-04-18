import React, {Component} from 'react'
import './index.less'
import {connect} from 'react-redux'
import actions from '../../../store/actions/details'
class Comments extends Component {
    constructor() {
        super();
        this.state = {isShow: false,isShowLoad:false}
    }

    handleUpdate = (event) => {
        this.update.addEventListener('touchstart', (event) => {
            let start = event.touches[0].clientY;
            this.update.addEventListener('touchmove', (event) => {
                if (event.touches[0].clientY - start > 20) {
                    this.setState({isShow: true})
                    setTimeout(() => {
                        this.setState({isShow: false})
                    }, 2000)
                }
                if (start-event.touches[0].clientY  > 20) {
                    this.setState({isShowLoad: true})
                    setTimeout(() => {
                        this.setState({isShowLoad: false})
                    }, 2000)
                }
            })
        })
    }

    componentDidMount() {
        let id = this.props.match.params.id
    }

    render() {
        let comments = this.props.comment.text
        return (
            <div className="detailComments" ref={input => this.update = input} onTouchStart={this.handleUpdate}>
                <div className="head">
                    <span><i className="iconfont icon-fanhui" onClick={this.props.history.goBack}></i>用户评价</span>
                </div>
                {this.state.isShow ? (<h2><i className="jiazai"></i></h2>) : null}

                <div className="user-comments">
                    <div className="com-number">
                        总共评价数：({comments ? comments.length : 0}条)
                    </div>
                    <ul className="comments">
                        {
                            comments ? (
                                comments.map((comment, index) => (
                                    <li key={index}>
                                        <p>{comment.content}</p>
                                        <h1><em>{comment.user}</em><i>{comment.time}</i></h1>
                                    </li>
                                ))
                            ) : <p>暂无评价</p>
                        }
                    </ul>
                </div>
                {this.state.isShowLoad ? (<h2><i className="jiazai"></i></h2>) : null}

            </div>
        )
    }
}
export default connect(
    state => state.detail,
    actions
)(Comments)


