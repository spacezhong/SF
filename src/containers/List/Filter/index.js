import React,{Component} from 'react';
import './index.less'

export default class Filter extends Component{
    changeType = (event)=> {
        let type = event.target.dataset.type;
        this.props.fetchClassifications(this.props.keyWord,type);
    };
    render(){
        return(
            <div className="filter-bar" onClick={this.changeType}>
               <span className={this.props.type==="undefined"?'active':'' }>热卖</span>
               <span className={this.props.type ==="price"?'active':''} data-type="price">价格</span>
               <span className={this.props.type === "comment"?'active':''} data-type="comment">好评</span>
            </div>
        )
    }
}
