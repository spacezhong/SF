import React,{memo} from 'react';
import './index.less';
import {Link} from 'react-router-dom';

function Discount(props){
    let {dataSource,time}=props;
    let data=dataSource.slice(0,2);
    return(
        <div className='discount'>
            <div className="discount-header clearfix">
                <div className='discount-need'>超值特惠</div>
            </div>
            <div className="discount-content">
                {
                    data.map((item,index)=>{
                        return(
                            <Link to={`/detail/${item.recommendID}`} className="discount-content-item" key={index}>
                                <img className='discount-img' src={item.privilegeImg} alt=""/>
                                <ins className="discount-privilegePrice">￥{item.privilegePrice}</ins>
                                <del className="discount-originalPrice">￥{item.originalPrice}</del>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
        )
};
export default memo(Discount);

/*class Discount extends React.Component{

    render(){
        let {dataSource,time}=this.props;
        let data=dataSource.slice(0,2);

        return(
            <div className='discount'>
                <div className="discount-header clearfix">
                    <div className='discount-need'>超值特惠</div>

                </div>
                <div className="discount-content">
                    {
                        data.map((item,index)=>{
                            return(
                                <Link to={`/detail/${item.recommendID}`} className="discount-content-item" key={index}>
                                    <img className='discount-img' src={item.privilegeImg} alt=""/>
                                    <ins className="discount-privilegePrice">￥{item.privilegePrice}</ins>
                                    <del className="discount-originalPrice">￥{item.originalPrice}</del>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Discount;*/
