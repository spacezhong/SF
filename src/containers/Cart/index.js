import React, {Component} from "react";
import './index.less';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cart from '../../store/actions/cart';
import personal from '../../store/actions/personal';
const actions={
    ...cart,...personal
};
class Cart extends Component {
    constructor() {
        super();
        this.state = {isEditing: false, allState: false};
    };
    componentDidMount() {
        this.props.validate();
       setTimeout(()=>{
           this.props.fetchCart(this.props.username);
         let allState = this.props.cartData.list.every(item => item.selected);
         this.setState({allState});
       })
    }
    changeItemState = (id) => {
        this.props.changeSelectState(id);
        setTimeout(() => {
            let allState = this.props.cartData.list.every(item => item.selected);
            this.setState({allState});
        }, 500)

    }
    edit = () => {
        this.setState({isEditing: !this.state.isEditing})
    }
    changeAll = () => {
        this.setState({allState: !this.state.allState}, () => {
            this.props.changeEvery(this.state.allState)
        });

    }
    clearShopCar = (username) => {
        this.props.clearCartData(username);
//  clearTimeout(timer)
// let timer= setTimeout(()=>{
//      this.setState({allState:!this.state.allState});
//  },500)

    }
    computedMoney=()=> {
      if(this.props.cartData.list.length>0){
        console.log(this.props.cartData.list);
        var total=this.props.cartData.list.reduce((prev, next) => {
          return prev + next.count * parseFloat(next.recommendPrice);
        }, 0)
      }
     return total;
    }
    render() {
        let newCart = this.props.cartData;
        let products = newCart.list.length>0 ? newCart.list : [];
        return (
            <div className="cart-shop">
                <div className="top">
                    <Link to="/list">
                        <i className="iconfont icon-fanhui"></i>
                    </Link>
                    <span className="dizhi">北京市 北京</span>
                    <span onClick={this.edit} className="bianji">{this.state.isEditing ? "完成" : "编辑"}</span>
                </div>
               <div className="container-cart">
                   <div className="container">
                       <div className="better">
                           <input className="all-cart" onChange={this.changeAll} type="checkbox" checked={this.state.allState}/>
                           <h3>优选普通商品</h3>
                       </div>
                       <ul className='product-list'>
                           {products.length > 0 && products.map((item, index) => (
                               <li key={index} className="product-item">
                                   <div className="product-left">
                                       <input onChange={() => this.changeItemState(item.recommendID)} type="checkbox" className="changeItemState"
                                              checked={item.selected}/>

                                       <img className='pro-image' src={item.recommendImg} alt=""/>
                                   </div>
                                   <div className="detail">
                                       <span className="p1">{item.recommendTitle}</span>
                                      <div className="cart-text">
                                          <span className="p3">￥</span>
                                          <span className="p4">{item.recommendPrice}</span>
                                          {
                                              this.state.isEditing ?
                                                  <span onClick={() => this.props.removeCartData({
                                                  username: this.props.user.username,
                                                  recommendID: item.recommendID
                                              })}><i className='iconfont icon-shanchu'></i></span> : null
                                          }
                                          <span className="count">
     <i onClick={() => this.props.upDate({
         username: this.props.username,
         recommendID: item.recommendID,
         count: item.count - 1,
       selected:true
     })} className="iconfont icon-jianhao3"></i>
               <b>{item.count}</b>
              <i className="iconfont icon-jiahao" onClick={() => this.props.upDate({
                  username: this.props.username,
                  recommendID: item.recommendID,
                  count: item.count + 1,
                   selected:true
              })}></i>
     </span>
                                      </div>
                                   </div>
                               </li>
                           ))
                           }

                       </ul>
                   </div>
                   <div className="shop-footer">
                       <div className="footer-left">
                           <span className="span1" >总计:￥{this.computedMoney()}</span>
                       </div>
     <div className="button-car">
         <span className='clear-shop' >{this.state.isEditing ? <span onClick={() => this.clearShopCar(this.props.username)}>清空</span> : "结算"}</span>

     </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default connect(
    state => ({...state.cart,...state.personal}),
    actions
)(Cart)

