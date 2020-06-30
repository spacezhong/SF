import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './index.less';
import actions from '../../../redux/actions/detail';

class DetailCarBar extends React.Component{

    handleCollect=()=>{
        let username=this.props.username;
        let recommendID=this.props.list.detailList.detailList[0].recommendID;
        let {activeKey}=this.props.collect;
        if(!activeKey){
            this.props.changeActiveAPI({activeKey:true});
            if(username){
                this.props.addCollectAPI({username,recommendID,collect:true});
            }
        }else{
            this.props.changeActiveAPI({activeKey:false});
            if(username){
                this.props.cancelCollectAPI({username,recommendID});
            }
        }
    };
    componentDidMount() {
        let username=this.props.username;
        let id=this.props.id;
        if(username){
            this.props.findCartAPI(username);
            this.props.findCollectAPI(username,id);
        }
    };
    componentWillUnmount() {
        this.props.changeActiveAPI({activeKey:false});
    };
    handleAddCart=()=>{
        let goodsNum=this.props.num+this.props.goodsNum;
        let username=this.props.username;
        let recommendID=this.props.list.detailList.detailList[0].recommendID;
        this.props.addCartAPI({
            flag:true,
            goodsNum:goodsNum,
            num:this.props.num,
            username:username || '',
            selected:true,
            recommendID,
        });
        //过一段时间再派发flag:false的动作,//时间要跟动画时间一致
        setTimeout(()=>{
            this.props.addCartAPI({
                flag:false,
                goodsNum:goodsNum,
            });
        },600);
    };
    render(){
        let {goodsNum,num,addCart,flag,data,img,username}=this.props;
        console.log(username);
        let cls=this.props.collect.activeKey?'iconfont icon-shoucang1 detailCarBar-collect active':'iconfont icon-shoucang1 detailCarBar-collect'
        return(
            <div className='detailCarBar'>
                <Link className="iconfont icon-cart detailCarBar-pic"
                      to={{pathname:`/cart`,state:username}}
                >
                    <div className="detailCarBar-count">{goodsNum}</div>
                </Link>
                <div className={cls}
                     onClick={this.handleCollect}
                ></div>
                <div className='detailCarBar-addCar'
                     onClick={this.handleAddCart}
                >
                    {flag?<img src={img} alt="" className='detailCarBar-addCar-img' />:null}
                    加入购物车
                </div>
                <div className="detailCarBar-buy">一键购买</div>
            </div>
        )
    }
}
export default connect(
    state=>({...state.detail,...state.personal}),
    actions,
)(DetailCarBar);