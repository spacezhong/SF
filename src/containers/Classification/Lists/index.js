import React,{memo} from 'react';
import {connect, useSelector} from 'react-redux';
import './index.less';
import ListFilterBar from './ListFilterBar';
import ListsContent from './ListsContent';
import KindHeader from '../../../components/KindHeader';

export default class Lists extends React.Component{

    render(){
        let data=this.props.data || [];//这个是searchList/classification页传入的数据
        let changeBarTabAPI=this.props.changeBarTabAPI;//这个是searchList/classification页传入调取数据的方法
        let changeFilterAPI=this.props.changeFilterAPI;
        let recoverAPI=this.props.recoverAPI;
        let tabs=this.props.tabs;
        let filterData=this.props.filterData;
        let activeKey=this.props.activeKey;
        let closePanel=this.props.closePanel;

        return(
            <div className="lists">
                <KindHeader/>
                <ListFilterBar
                    tabs={tabs}
                    filterData={filterData}
                    activeKey={activeKey}
                    closePanel={closePanel}
                    changeBarTabAPI={changeBarTabAPI}
                    changeFilterAPI={changeFilterAPI}
                    recoverAPI={recoverAPI}
                />
                <ListsContent dataSource={data}/>
            </div>
        )
    }
};


/*function Lists(props){
    let data=props.data || [];//这个是searchList/classification页传入的数据
    let changeBarTabAPI=props.changeBarTabAPI;//这个是searchList/classification页传入调取数据的方法
    let changeFilterAPI=props.changeFilterAPI;
    let tabs=props.tabs;
    let filterData=props.filterData;
    let activeKey=props.activeKey;
    let closePanel=props.closePanel;
    return(
        <div className="lists">
            <KindHeader/>
            <ListFilterBar
                tabs={tabs}
                filterData={filterData}
                activeKey={activeKey}
                closePanel={closePanel}
                changeBarTabAPI={changeBarTabAPI}
                changeFilterAPI={changeFilterAPI}
            />
            <ListsContent dataSource={data}/>
        </div>
        )
};
export default memo(Lists);*/



