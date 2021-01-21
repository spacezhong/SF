import React,{memo} from 'react';
import './index.less';
import {useSelector} from "react-redux";

/*class DetailCount extends React.Component{

    handleClick=(e)=>{
        let num=parseInt(this.input.placeholder);
        let doType=e.target.dataset.type;
        this.props.changeNum(num,doType);
    };
    render(){
        let num=this.props.num;
        return(
            <div className="detail-product-count">
                <div className="detail-product-count-title">数量</div>
                <div className="detail-product-count-minus"
                     onClick={(e)=>this.handleClick(e)}
                     data-type="minus"
                >-</div>
                <input className="detail-product-count-number"
                       placeholder={num}
                       ref={ref=>this.input=ref}
                       data-type="input"
                />
                <div className="detail-product-count-add"
                     data-type='add'
                     onClick={(e)=>this.handleClick(e)}
                >+</div>
            </div>
        )
    }
}
export default DetailCount;*/

function DetailCount(props){
    const input=React.useRef();
    let num=props.num;
    const handleClick=(e)=>{
        let num=parseInt(input.current.placeholder);
        let doType=e.target.dataset.type;
        props.changeNum(num,doType);
    };
    return(
        <div className="detail-product-count">
            <div className="detail-product-count-title">数量</div>
            <div className="detail-product-count-minus"
                 onClick={(e)=>handleClick(e)}
                 data-type="minus"
            >-</div>
            <input className="detail-product-count-number"
                   placeholder={num}
                   ref={input}
                   data-type="input"
            />
            <div className="detail-product-count-add"
                 data-type='add'
                 onClick={(e)=>handleClick(e)}
            >+</div>
        </div>
        )
};
export default memo(DetailCount);