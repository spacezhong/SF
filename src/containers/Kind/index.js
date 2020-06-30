import React from 'react';
import KindHeader from '../../components/KindHeader';
import KindContent from './KindContent';
import './index.less';
import {connect} from 'react-redux';
import actions from '../../redux/actions/kind';
class Kind extends React.Component{
    componentDidMount() {
        this.props.getKindAPI();
    }
    render(){
        console.log(this.props.kindList.data);
        let kind=this.props.kindList.data.kind || [];
        console.log(kind);
        let {currentLeftIndex}=this.props.kindList;
        let {clickLeftAPI}=this.props;
        return(
            <div className="kind">
                <KindHeader/>
                <KindContent
                    dataSource={kind}
                    currentLeftIndex={currentLeftIndex}
                    clickLeftAPI={clickLeftAPI}

                />
            </div>
        )
    }
}
export default connect((state)=>({...state.kind}),actions)(Kind);