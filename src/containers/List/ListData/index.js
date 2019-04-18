import React,{Component} from 'react';
import Filter from '../Filter'
import ListSearch from '../Listsearch'
import {Link} from 'react-router-dom'
import  './index.less';
export default class ListData extends Component{
    render(){
        console.log(this.props);
        return(
            <div className="productList">
                <ListSearch/>
                {/*排序组件*/}
                <Filter
                    keyWord={this.props.keyWord}
                    fetchClassifications={this.props.fetchClassifications}
                />
                <ul className="product-list">
                    {
                        this.props.dataClassifications&&this.props.dataClassifications.map((item,index)=>(
                            <li className="cations-item" key={index}>
                                <Link  to={{pathname:`/detail/${item.recommendID
                                    }`}}  key={index} >
                                    <div className="contentImg">
                                        <img src={item.recommendImg} />
                                    </div>
                                    <div className="classification-content ">
                                        <h4 className="recommendTitle">  {item.recommendTitle}</h4>
                                        <p className="price">{'￥'+item.recommendPrice}</p>
                                    </div>

                                </Link>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>

        )
    }
}

