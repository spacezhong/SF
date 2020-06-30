import React from 'react';
import './index.less';
import {withRouter} from 'react-router-dom';
class HeaderBar extends React.Component{
    render(){
        return(
            <div className='headerBar'>
                <i onClick={()=>{this.props.history.goBack(-1)}}
                   className="iconfont icon-fanhui headerBar-back"></i>
                {this.props.title}
            </div>
        )
    }
}
export default withRouter(HeaderBar);