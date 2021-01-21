import React,{memo} from 'react';
import './index.less';

class ListFilterBar extends React.Component{

    renderListsBar=()=>{
        let array=[];
        let cls;
        let tabs=this.props.tabs;
         for(let key in tabs){
             let item=tabs[key];
             let barTab=item.key;
             if(this.props.activeKey===barTab){//第一次点击后，加上active类名
                 cls=`listsBar-item active`;
                 if(this.props.closePanel){//第二次点击后，
                     cls+=`listsBar-item-${item.key}`;
                 }
             }else{
                 cls=`listsBar-item`
             }
             array.push(
                 <div className={cls} key={barTab}
                      onClick={()=>this.handleTopClick(barTab)}>
                        {item.text}
                 </div>
             )
         }
        return array;
    };
    handleTopClick=(barTab)=>{
        let closePanel=false;//第一次点击某个tab
        if(this.props.activeKey===barTab && !this.props.closePanel){//第二次点击某个tab
            closePanel=true;
        }
        this.props.changeBarTabAPI(barTab,closePanel)
    };
    renderListsBarInner=()=>{
        let tabs=this.props.tabs;
        let filterData=this.props.filterData || {};
        let allArray=filterData.all?filterData.all:[];
        let priceArray=filterData.price?filterData.price:[];
        let siftArray=filterData.sift?filterData.sift:[];
        for(let key in tabs){
            let item=tabs[key];//item={text:'全部分类',key:'all'}
            if(this.props.activeKey===item.key){
                if(item.key==='all'){
                    return (
                        <div className={`panel ${item.key}-panel`} >
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    allArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>this.handleCurrentClick(item.key,currentItem,allArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }else if(item.key==='price'){
                    return (
                        <div className={`panel ${item.key}-panel`} >
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    priceArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>this.handleCurrentClick(item.key,currentItem,priceArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }else if(item.key==='sift'){
                    return (
                        <div className={`panel ${item.key}-panel`} >
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    siftArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>this.handleCurrentClick(item.key,currentItem,siftArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }
            }
        }
    };
    revertCurrent=(array)=>{
        array.forEach((item,index)=>{
            item.current=false;
        })
    };
    handleCurrentClick=(key,currentItem,array)=>{
        this.revertCurrent(array);
        currentItem.current=true;
        this.props.changeFilterAPI(key,currentItem);
    };
    componentWillUnmount() {
        this.props.recoverAPI()
    };

    render(){
        let closePanel=this.props.closePanel;
        let filterData=this.props.filterData;
        let tabs=this.props.tabs;//tabs={'all':{text:'全部分类',key:'all'},}
        return(
            <div className="listsBar" >
                <div className="listsBar-top">
                    {this.renderListsBar()}
                </div>
                {
                    !closePanel?
                        <div className="listsBar-inner">
                            {this.renderListsBarInner()}
                        </div>
                        :null
                }
            </div>
        )
    }
}
export default ListFilterBar;

/*function ListFilterBar(props){
    let closePanel=props.closePanel;
    let filterData=props.filterData;
    let tabs=props.tabs;//tabs={'all':{text:'全部分类',key:'all'},}
    const  revertCurrent=(array)=>{
        array.forEach((item,index)=>{
            item.current=false;
        })
    };
    const handleCurrentClick=(key,currentItem,array)=>{
        revertCurrent(array);
        currentItem.current=true;
        props.changeFilterAPI(key,currentItem);
    };
    const renderListsBarInner=()=>{
        let tabs=props.tabs;
        let filterData=props.filterData || {};
        let allArray=filterData.all?filterData.all:[];
        let priceArray=filterData.price?filterData.price:[];
        let siftArray=filterData.sift?filterData.sift:[];
        for(let key in tabs){
            let item=tabs[key];//item={text:'全部分类',key:'all'}
            if(props.activeKey===item.key){
                if(item.key==='all'){
                    return (
                        <div className={`panel ${item.key}-panel`}>
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    allArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>handleCurrentClick(item.key,currentItem,allArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }else if(item.key==='price'){
                    return (
                        <div className={`panel ${item.key}-panel`} >
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    priceArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>handleCurrentClick(item.key,currentItem,priceArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }else if(item.key==='sift'){
                    return (
                        <div className={`panel ${item.key}-panel`} >
                            <ul className={`panel-inner ${item.key}-panel-inner`}>
                                {
                                    siftArray.map((currentItem,index)=>{
                                        let cls=currentItem.current?`panel-item ${item.key}-panel-item active`:`panel-item ${item.key}-panel-item`;
                                        return(
                                            <li className={cls}
                                                key={index}
                                                onClick={()=>handleCurrentClick(item.key,currentItem,siftArray)}
                                            >
                                                {currentItem.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }
            }
        }
    };
    const handleTopClick=(barTab)=>{
        let closePanel=false;//第一次点击某个tab
        if(props.activeKey===barTab && !props.closePanel){//第二次点击某个tab
            closePanel=true;
        }
        props.changeBarTabAPI(barTab,closePanel)
    };
    const renderListsBar=()=>{
        let array=[];
        let cls;
        let tabs=props.tabs;
        for(let key in tabs){
            let item=tabs[key];
            let barTab=item.key;
            if(props.activeKey===barTab){//第一次点击后，加上active类名
                cls=`listsBar-item active`;
                if(props.closePanel){//第二次点击后，
                    cls+=`listsBar-item-${item.key}`;
                }
            }else{
                cls=`listsBar-item`
            }
            array.push(
                <div className={cls} key={barTab}
                     onClick={()=>handleTopClick(barTab)}>
                    {item.text}
                </div>
            )
        }
        return array;
    };
    return(
        <div className="listsBar" >
            <div className="listsBar-top">
                {renderListsBar()}
            </div>
            {
                !closePanel?
                    <div className="listsBar-inner">
                        {renderListsBarInner()}
                    </div>
                    :null
            }
        </div>
        )
};
export default memo(ListFilterBar);*/

