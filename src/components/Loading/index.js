import React,{memo} from 'react';
import './index.less';
/*class Loading extends React.Component{
    render(){
        return(
            <div className="loading">
                ————— {this.props.loadingText} ——————
            </div>
        )
    }
}
export default Loading;*/

function Loading(props){

    return(
        <div className="loading">
            {
                props.loadingText==='加载中'
                ?''
                :`————— ${props.loadingText} ——————`
            }
        </div>
        )
};
export default memo(Loading);
