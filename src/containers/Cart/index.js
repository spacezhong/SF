import {connect, useSelector, useDispatch, shallowEqual} from 'react-redux';
import React,{memo} from'react';
import {Link} from 'react-router-dom';
import './index.less';
import actions1 from '../../redux/actions/personal';
import actions2,{emptyAllAPI,deleteAPI,changeEditAPI,allChangeCheckedAPI,changeCheckedAPI,updateAPI} from '../../redux/actions/cart';

class Cart extends React.Component {
    handleEmptyAll=(username)=>{
        this.props.emptyAllAPI(username)
    };
    handleDelete=({username,recommendID})=>{
        this.props.deleteAPI({username,recommendID});
    };
    renderTotalPrice=()=>{
        let totalPrice;
        let lists=this.props.lists || [];
        if(lists){
            let selectedLists=lists.filter(item=>(item.selected===true));
            totalPrice=selectedLists.reduce((prev,next)=>{
                return (
                    prev+next.num*next.recommendPrice
                )
            },0);
            return totalPrice;
        }else{
            return 0;
        }
    };
    changeNum=(e,recommendID,num)=>{
        let doType=e.target.dataset.type;
        let {isEditing}=this.props;
        if(isEditing){
            if(doType==='minus'){
                if(num>1){
                    num--;
                    this.props.updateAPI({
                        username:this.props.username,
                        selected:true,
                        recommendID,
                        num,
                    })
                }
            }else{
                num++;
                this.props.updateAPI({
                    username:this.props.username,
                    selected:true,
                    recommendID,
                    num,
                })
            }
        }

    };
    handleAllChange=(allCheck)=>{
        this.props.allChangeCheckedAPI(!allCheck);
    };
    handleChange=(id)=>{
        this.props.changeCheckedAPI(id);
    };
    handleClick=()=>{
        let {isEditing}=this.props;
        this.props.changeEditAPI(!isEditing);
    };
    componentDidMount() {
        this.props.getCartAPI(this.props.username);
    };
    render() {
        let {isEditing,allCheck}=this.props;
        let lists=this.props.lists?this.props.lists:[];
        let username=this.props.username;
        return (
            <div className="cart-shop">
                <div className="top">
                    <Link to='/kind' className="iconfont icon-fanhui back"></Link>
                    <span className="address">北京市 北京</span>
                    <span  className="edit" onClick={this.handleClick}>{isEditing?"完成":'编辑'}</span>
                </div>

                <div className="container-cart">
                    <div className="container">
                        <div className="better">
                            <input onChange={()=>{this.handleAllChange(allCheck)}} className="all-cart"  type="checkbox" checked={allCheck}/>
                            <h3>优选普通商品</h3>
                        </div>
                        <ul className='product-list'>
                            {
                                lists.map((item,index)=>{
                                return (
                                    <li  className="product-item" key={item.recommendID}>
                                    <div className="product-left">
                                        <input  onChange={()=>{this.handleChange(item.recommendID)}} type="checkbox" className="changeItemState" checked={item.selected}/>
                                        <Link to={`/detail/${item.recommendID}`}>
                                            <img className='pro-image' src={item.recommendImg} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="cart-detail">
                                        <div className="cart-title">{item.recommendTitle}</div>
                                        <div className="cart-text">
                                            <span className="cart-price">￥{item.recommendPrice}</span>
                                            <span className="count">
                                                {
                                                    isEditing?
                                                    <i className="iconfont icon-shanchu clear"
                                                       onClick={()=>{this.handleDelete({username,recommendID:item.recommendID})}}
                                                    ></i>:null
                                                }
                                                <i  data-type='minus' className="iconfont icon-jianhao3 minus"
                                                    onClick={(e)=>{this.changeNum(e,item.recommendID,item.num)}}
                                                ></i>
                                                <span className='number'>{item.num}</span>
                                                <i  data-type='add' className="iconfont icon-jiahao add"
                                                    onClick={(e)=>{this.changeNum(e,item.recommendID,item.num)}}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                </li>)
                            })
                            }
                        </ul>
                    </div>
                    <div className="shop-footer">
                        <div className="footer-left">
                            总计:￥{this.renderTotalPrice()}
                        </div>
                        <div className="button-car">
                            {isEditing?
                                <div className="toChectOut"
                                     onClick={()=>{this.handleEmptyAll(username)}}
                                >全部清空</div>
                                :<div className="empty">去结算</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default connect(
    state=>({...state.cart,...state.personal}),
    {...actions1,...actions2}
)(Cart);

/*function Cart(){
    const {lists=[],username,isEditing,allCheck}=useSelector(state=>({
        ...state.cart,
        ...state.personal
    }),shallowEqual);
    const dispatch=useDispatch();
    const handleClick=()=>{
        dispatch(changeEditAPI(!isEditing));
    };
    const handleAllChange=(allCheck)=>{
        dispatch(allChangeCheckedAPI(!allCheck))
    };
    const handleChange=(id)=>{
        dispatch(changeCheckedAPI(id));
    };
    const handleDelete=({username,recommendID})=>{
        dispatch(deleteAPI({username,recommendID}));
    };
    const changeNum=(e,recommendID,num)=>{
        let doType=e.target.dataset.type;
        if(isEditing){
            if(doType==='minus'){
                if(num>1){
                    num--;
                    dispatch(updateAPI({
                        username,
                        selected:true,
                        recommendID,
                        num,
                    }));
                }
            }else{
                num++;
                dispatch(updateAPI({
                    username,
                    selected:true,
                    recommendID,
                    num,
                }));
            }
        }

    };
    const renderTotalPrice=()=>{
        let totalPrice;
        if(lists){
            let selectedLists=lists.filter(item=>(item.selected===true));
            totalPrice=selectedLists.reduce((prev,next)=>{
                return (
                    prev+next.num*next.recommendPrice
                )
            },0);
            return totalPrice;
        }else{
            return 0;
        }
    };
    const handleEmptyAll=(username)=>{
        dispatch(emptyAllAPI(username));
    };
    return(
        <div className="cart-shop">
            <div className="top">
                <Link to='/kind' className="iconfont icon-fanhui back"></Link>
                <span className="address">北京市 北京</span>
                <span  className="edit" onClick={handleClick}>{isEditing?"完成":'编辑'}</span>
            </div>

            <div className="container-cart">
                <div className="container">
                    <div className="better">
                        <input onChange={()=>{handleAllChange(allCheck)}} className="all-cart"  type="checkbox" checked={allCheck}/>
                        <h3>优选普通商品</h3>
                    </div>
                    <ul className='product-list'>
                        {
                            lists.map((item,index)=>{
                                return (
                                    <li  className="product-item" key={item.recommendID}>
                                        <div className="product-left">
                                            <input  onChange={()=>{handleChange(item.recommendID)}} type="checkbox" className="changeItemState" checked={item.selected}/>
                                            <Link to={`/detail/${item.recommendID}`}>
                                                <img className='pro-image' src={item.recommendImg} alt=""/>
                                            </Link>
                                        </div>
                                        <div className="cart-detail">
                                            <div className="cart-title">{item.recommendTitle}</div>
                                            <div className="cart-text">
                                                <span className="cart-price">￥{item.recommendPrice}</span>
                                                <span className="count">
                                                {
                                                    isEditing?
                                                        <i className="iconfont icon-shanchu clear"
                                                           onClick={()=>{handleDelete({username,recommendID:item.recommendID})}}
                                                        ></i>:null
                                                }
                                                    <i  data-type='minus' className="iconfont icon-jianhao3 minus"
                                                        onClick={(e)=>{changeNum(e,item.recommendID,item.num)}}
                                                    ></i>
                                                <span className='number'>{item.num}</span>
                                                <i  data-type='add' className="iconfont icon-jiahao add"
                                                    onClick={(e)=>{changeNum(e,item.recommendID,item.num)}}
                                                ></i>
                                            </span>
                                            </div>
                                        </div>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="shop-footer">
                    <div className="footer-left">
                        总计:￥{renderTotalPrice()}
                    </div>
                    <div className="button-car">
                        {isEditing?
                            <div className="toChectOut"
                                 onClick={()=>{handleEmptyAll(username)}}
                            >全部清空</div>
                            :<div className="empty">去结算</div>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
};
export default memo(Cart);*/
