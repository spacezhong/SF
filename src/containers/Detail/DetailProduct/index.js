import React,{memo} from 'react';
import './index.less';

/*class DetailProduct extends React.Component{

    render(){
        let data=this.props.dataSource?this.props.dataSource: [];
        let dataSource=data[0]?data[0]:{};
        return(
            <div className="detail-product">
                <img className="detail-product-img" src={dataSource.recommendImg}/>
                <div className="des">
                    {dataSource.productsDate?<div className="new">{dataSource.productsDate}</div>:null}
                    <div className="title">{dataSource.recommendTitle}</div>
                </div>
                <div className="detail-product-price">￥{dataSource.recommendPrice}</div>
                <div className="detail-product-otherInfo">
                    <div className="detail-product-origin">产地：{dataSource.graphicOrigin}</div>
                    {
                        dataSource.graphicBrand?<div className="detail-product-brand">品牌：{dataSource.graphicBrand}</div>
                        :<div className="detail-product-brand">品牌：不详</div>
                    }
                    {
                        dataSource.graphicSpecification?<div className="detail-product-size">规格：{dataSource.graphicSpecification}</div>
                            :<div className="detail-product-size">规格：不详</div>
                    }
                </div>
            </div>
        )
    }
}
export default DetailProduct;*/

function DetailProduct(props){

    let data=props.dataSource?props.dataSource: [];
    let dataSource=data[0]?data[0]:{};
    return(
        <div className="detail-product">
            <img className="detail-product-img" src={dataSource.recommendImg}/>
            <div className="des">
                {dataSource.productsDate?<div className="new">{dataSource.productsDate}</div>:null}
                <div className="title">{dataSource.recommendTitle}</div>
            </div>
            <div className="detail-product-price">￥{dataSource.recommendPrice}</div>
            <div className="detail-product-otherInfo">
                <div className="detail-product-origin">产地：{dataSource.graphicOrigin}</div>
                {
                    dataSource.graphicBrand?<div className="detail-product-brand">品牌：{dataSource.graphicBrand}</div>
                        :<div className="detail-product-brand">品牌：不详</div>
                }
                {
                    dataSource.graphicSpecification?<div className="detail-product-size">规格：{dataSource.graphicSpecification}</div>
                        :<div className="detail-product-size">规格：不详</div>
                }
            </div>
        </div>
        )
};
export default memo(DetailProduct);

