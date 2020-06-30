import React from 'react';
import {Link} from 'react-router-dom';
class ListItem extends React.Component{
    render(){
        let {itemData}=this.props;
        return(
            <Link to={`/detail/${itemData.recommendID}`} className='homeLists-item'>
                <img className="homeLists-item-img" src={itemData.recommendImg}/>
                <div className="homeLists-item-origin">{itemData.graphicOrigin}</div>
                <div className="homeLists-item-title">{itemData.recommendTitle}</div>
                <div className="homeLists-item-bottom">
                    <span className="homeLists-item-price">￥{itemData.recommendPrice}</span>
                    {itemData.recommendGift?<span className='homeLists-item-gift'>{itemData.recommendGift}</span>:null}
                </div>
            </Link>
        )
    }
}
export default ListItem;