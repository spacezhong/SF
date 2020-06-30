import React from 'react';
import {Link} from 'react-router-dom';
import './index.less';

class ListsContent extends React.Component{

    render(){
        let {dataSource}=this.props;
        return(
            <div className="listsContent">
                {
                    dataSource.map((item,index)=>{
                        return(
                            <Link to={`/detail/${item.recommendID}`}
                                className="lists-item"
                                key={index}
                            >
                                <img src={item.recommendImg} alt="" className="lists-item-img"/>
                                <div className="lists-item-right">
                                    <div className="lists-item-title">{item.recommendTitle}</div>
                                    {
                                        item.productsFeatured?
                                            <div className="lists-item-recommend">{item.productsFeatured}</div>
                                            :null
                                    }
                                    <div className="lists-item-comment">评价数：{item.graphicComment}</div>
                                    <div className="lists-item-bottom">
                                        <span className="lists-item-price">￥{item.recommendPrice}</span>
                                        {
                                            item.recommendGift?<span className="lists-item-gift">{item.recommendGift}</span>:null
                                        }
                                        {
                                            item.productsDate?<span className="lists-item-new">{item.productsDate}</span>:null
                                        }
                                    </div>

                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        )
    }
}
export default ListsContent;