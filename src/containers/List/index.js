import React,{Component} from "react";
import ListSearch from './ListSearch/index'
import Tab from '../../components/Tab/index'
import {connect} from "react-redux"
import actions from "../../store/actions/list"
import './index.less';
import {Link} from 'react-router-dom';
class List extends Component{
    componentDidMount(){
        this.props.fetchLists();
    }
    render(){
        let dataLists=this.props.listDatas;
        return(
            <div>
                <ListSearch/>
                {/*分类*/}
                <ul className="dataLists">
                    {
                        dataLists&&dataLists.map((item,index)=>(
                            <li key={index} className="content-list">
                                <Link key={index} to={{pathname:`/list/classification/${item.title}`}}>
                                    <img src={item.listImg} className="listPicture"/>
                                    <h3 className="listTitle">{item.title}</h3>
                                    <p className="listMark">{item.mark}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Tab/>
            </div>
        )
    }
}
export default connect(
    state=>state.list,
    actions
)(List);
