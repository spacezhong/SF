import React,{Component} from 'react';
import {connect} from "react-redux"
import actions from "../../../store/actions/list"
import ListData from "../ListData/index";
class Classification extends Component {
    componentDidMount() {
        this.props.fetchClassifications(this.props.match.params.title);
        console.log(this.props.match.params.title);
    }
    render(){
        let dataClassifications=this.props.classifications||[];
        console.log(this.props.classifications);
        return (
                <ListData dataClassifications={dataClassifications}
                    keyWord={this.props.match.params.title}
                    fetchClassifications={this.props.fetchClassifications}
                    type={this.props.type}
                />
        )
    }
}
export default connect(
    state=>state.classification,
    actions
)(Classification);