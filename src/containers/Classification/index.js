import React from 'react';
import {connect} from 'react-redux';
import Lists from './Lists/index';
import actions from '../../redux/actions/list'

class Classification extends React.Component{

    componentDidMount() {
        this.props.getListAPI(this.props.match.params.title);
        this.props.getFilterDataAPI();
    };

    render(){
        let data=this.props.list.listData.list || [];
        let tabs=this.props.list.tabs;
        let allText=tabs.all.text;
        let priceText=tabs.price.text;
        let siftText=tabs.sift.text;
        let activeKey=this.props.list.activeKey;
        let closePanel=this.props.list.closePanel;
        if(activeKey==='all'&&closePanel){
            if(allText==='综合排序'){

            }else if(allText==='评论数从高到低'){
                data=data.sort((a,b)=>(parseInt(b.graphicComment)-parseInt(a.graphicComment)));
            }
        }else if(activeKey==='price'&&closePanel){
            if(priceText==='价格从高到低'){//还是使用state里的text比obj.name方便，因为obj.name会出现undefined的情况
                data=data.sort((a,b)=>(parseInt(b.recommendPrice)-parseInt(a.recommendPrice)));
            }else if(priceText==='价格从低到高'){
                data=data.sort((a,b)=>(parseInt(a.recommendPrice)-parseInt(b.recommendPrice)));
                console.log(data);
            }
        }else if(activeKey==='sift'&&closePanel){
            if(siftText==='推荐'){//还是使用state里的text比obj.name方便，因为obj.name会出现undefined的情况
                data=data.filter((item)=>(item.productsFeatured==='推荐'));
            }else if(siftText==='满赠'){
                data=data.filter((item)=>(item.recommendGift==='满赠'));
            }else if(siftText==='新品'){
                data=data.filter((item)=>(item.productsDate==='新品'));
            }
        }
        let filterData=this.props.list.filterData.filterData || {};
        return(
            <Lists
                data={data}
                filterData={filterData}
                tabs={tabs}
                activeKey={activeKey}
                closePanel={closePanel}
                changeBarTabAPI={this.props.changeBarTabAPI}
                changeFilterAPI={this.props.changeFilterAPI}
            />
        )
    }
}
export default connect((state)=>({...state.classification}),actions)(Classification);