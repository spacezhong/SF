import React from 'react';
import {connect} from 'react-redux';
import './index.less';
import ListFilterBar from './ListFilterBar';
import ListsContent from './ListsContent';
import KindHeader from '../../../components/KindHeader';
import actions from '../../../redux/actions/list';

export default class Lists extends React.Component{

    render(){
        let data=this.props.data || [];//这个是searchList/classification页传入的数据
        let changeBarTabAPI=this.props.changeBarTabAPI;//这个是searchList/classification页传入调取数据的方法
        let changeFilterAPI=this.props.changeFilterAPI;
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
                />
                <ListsContent dataSource={data}/>
            </div>
        )
    }
}
//export default connect((state)=>({}),actions)(Lists);