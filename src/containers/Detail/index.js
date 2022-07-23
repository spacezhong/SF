import React,{memo,useEffect} from 'react';
import './index.less';
import {connect,shallowEqual,useSelector,useDispatch} from 'react-redux';
import actions,{changeNum,addCartAPI,getDetailAPI,initializerAPI} from '../../redux/actions/detail';
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
                <div className="detail-container-content">
                    <DetailProduct dataSource={data}/>
                    <DetailCount num={num} changeNum={changeNum}/>
                </div>
                <DetailCarBar  id={id} img={img} num={num} addCartAPI={addCartAPI} goodsNum={goodsNum} flag={flag}/>
            </div>
        )
    }
}
export default connect((state)=>({...state.detail}),actions)(Detail);

/*function Detail(props){

    const {list,count,aboutCart}=useSelector(state=>({
        ...state.detail
    }),shallowEqual);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getDetailAPI(props.match.params.id));
        return ()=>{
            dispatch(initializerAPI());
        };
    },[dispatch]);

    let data=list.detailList.detailList || [];
    let obj=data[0]?data[0] : {};
    let img=obj.recommendImg;
    let {num}=count;
    let {flag,goodsNum}=aboutCart;
    let id=props.match.params.id;

    return(
        <div className="detail">
            <HeaderBar title='商品' />
            <DetailProduct dataSource={data}/>
            <DetailCount num={num} changeNum={changeNum}/>
            <DetailCarBar  id={id} img={img} num={num} addCartAPI={addCartAPI} goodsNum={goodsNum} flag={flag}/>
        </div>
        )
};
export default memo(Detail);*/
