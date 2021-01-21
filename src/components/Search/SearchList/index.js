import React,{memo,useEffect} from 'react';
import {connect,useSelector,shallowEqual,useDispatch} from 'react-redux';
import actions,{changeBarTabAPI,changeFilterAPI,getFilterDataAPI} from '../../../redux/actions/search';
import Lists from '../../../containers/Classification/Lists';

class SearchList extends React.Component{

    componentDidMount() {
        this.props.getFilterDataAPI();
    };
    render(){
        let data=this.props.search.listData.data || [];
        let tabs=this.props.search.tabs;
        let allText=tabs.all.text;
        let priceText=tabs.price.text;
        let siftText=tabs.sift.text;
        let activeKey=this.props.search.activeKey;
        let closePanel=this.props.search.closePanel;
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
        let filterData=this.props.search.filterData.filterData || {};
        return(
            <Lists
                data={data}
                filterData={filterData}
                tabs={tabs}
                activeKey={activeKey}
                closePanel={closePanel}
                changeBarTabAPI={this.props.changeBarTabAPI}
                changeFilterAPI={this.props.changeFilterAPI}
                recoverAPI={this.props.recoverAPI}
            />
        )
    }
};
export default connect((state)=>({...state.searchTotal}),actions)(SearchList);

/*function SearchList(){
    const {search:{listData,tabs,activeKey,closePanel}}=useSelector(state=>({
        ...state.searchTotal,

    }),shallowEqual);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getFilterDataAPI());
    },[]);
    let data=listData.data || [];
    let allText=tabs.all.text;
    let priceText=tabs.price.text;
    let siftText=tabs.sift.text;
    if(activeKey==='all' && closePanel){
        if(allText==='综合排序'){

        }else if(allText==='评论数从高到低'){
            data=data.sort((a,b)=>(parseInt(b.graphicComment)-parseInt(a.graphicComment)));
        }
    }else if(activeKey==='price'&&closePanel){
        if(priceText==='价格从高到低'){//还是使用state里的text比obj.name方便，因为obj.name会出现undefined的情况
            data=data.sort((a,b)=>(parseInt(b.recommendPrice)-parseInt(a.recommendPrice)));
        }else if(priceText==='价格从低到高'){
            data=data.sort((a,b)=>(parseInt(a.recommendPrice)-parseInt(b.recommendPrice)));
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
    let filterData=search.filterData.filterData || {};
    return(
        <Lists
            data={data}
            filterData={filterData}
            tabs={tabs}
            activeKey={activeKey}
            closePanel={closePanel}
            changeBarTabAPI={changeBarTabAPI}
            changeFilterAPI={changeFilterAPI}
        />
        )
};

export default memo(SearchList);*/
