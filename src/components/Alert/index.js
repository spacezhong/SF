import React, {Component,memo,useEffect} from 'react';
import {useSelector,shallowEqual,useDispatch} from 'react-redux';
import './index.less';

import actions from '../../redux/actions/personal';

class Alert extends Component {
    static defaultProps = {
        level: 'default'
    };
    componentDidMount(){
        setTimeout(()=>{
            this.props.clearMessages();
        },2000);
    }
    render() {
        if (this.props.success) {
            return (
                <div className="alert success">
                    {this.props.success}
                </div>
            )
        } else if (this.props.error) {
            return (
                <div className="alert error">
                    {this.props.error}
                </div>
            )
        } else {
            return null;
        };

    }
}
export default connect(
    state => state.personal,
    actions
)(Alert);

/*function Alert(){

    const {personal:{success,error}}=useSelector(state=>({
        ...state.personal
    }),shallowEqual);
    const dispatch=useDispatch();
    useEffect(()=>{
        /!*setTimeout(()=>{
            dispatch(clearMessages());
        },2000);*!/
    },[]);

    if (success) {
        return (
            <div className="alert success">
                {success}
            </div>
        )
    } else if (error) {
        return (
            <div className="alert error">
                {error}
            </div>
        )
    } else {
        return null;
    };
};
export default memo(Alert);*/
