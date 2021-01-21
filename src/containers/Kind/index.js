import React,{memo,useEffect} from 'react';
import KindHeader from '../../components/KindHeader';
import KindContent from './KindContent';
import './index.less';
import {connect, useSelector, useDispatch, shallowEqual} from 'react-redux';
import {clickLeftAPI,getKindAPI} from '../../redux/actions/kind';

function Kind(){
    const {kindList}=useSelector(state=>({
        ...state.kind,
    }),shallowEqual);
    let kind=kindList.data.kind || [];
    let {currentLeftIndex}=kindList;
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getKindAPI());
    },[dispatch]);

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
};
export default memo(Kind);

/*class Kind extends React.Component{
    componentDidMount() {
        this.props.getKindAPI();
    };
    render(){
        let kind=this.props.kindList.data.kind || [];
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
export default connect((state)=>({...state.kind}),actions)(Kind);*/
