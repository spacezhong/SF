import React from 'react';
import './index.less';
class Loading extends React.Component{
    render(){
        return(
            <div className="loading">
                {this.props.loadingText}
            </div>
        )
    }
}
export default Loading;