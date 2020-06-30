import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import actions from '../../redux/actions/detail';
import HeaderBar from '../../components/HeaderBar';
import DetailCarBar from './DetailCarBar';
import DetailProduct from './DetailProduct';
import DetailCount from './DetailCount';

class Detail extends React.Component{

    componentDidMount() {
        this.props.getDetailAPI(this.props.match.params.id);
    };
    componentWillUnmount() {
        this.props.initializerAPI();
    };

    render(){
        let data=this.props.list.detailList.detailList || [];
        let obj=data[0]?data[0] : {};
        let img=obj.recommendImg;
        let {num}=this.props.count;
        let {flag,goodsNum}=this.props.aboutCart;
        let {changeNum,addCartAPI}=this.props;
        let id=this.props.match.params.id;
        return(
            <div className="detail">
                <HeaderBar title='商品' />
                <DetailProduct dataSource={data}/>
                <DetailCount num={num} changeNum={changeNum}/>
                <DetailCarBar  id={id} img={img} num={num} addCartAPI={addCartAPI} goodsNum={goodsNum} flag={flag}/>
            </div>
        )
    }
}
export default connect((state)=>({...state.detail}),actions)(Detail);