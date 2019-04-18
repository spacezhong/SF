import React,{Component} from 'react';
import {connect} from "react-redux"
import actions from "../../../store/actions/search"
import ListData from "../ListData/index";
 class SearchList extends Component{
    componentDidMount(){
        this.props.fetchSearch(this.props.match.params.title);
        console.log(this.props.match.params.title);
    }
     render(){
         console.log(this.props);
         let dataSearchs=this.props.searchs;
         return (
             <ListData
                 dataClassifications={dataSearchs}
                 keyWord={this.props.match.params.title}
                 fetchClassifications={this.props.fetchSearch}
                 type={this.props.type}
             />
         )
     }
 }
export default connect(
    state=>state.search,
    actions
)(SearchList);