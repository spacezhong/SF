import React from 'react';
import './index.less';
import {withRouter,Link} from 'react-router-dom';
class KindHeader extends React.Component{
    render(){
        return(
            <div className="kindHeader" >
                <div className='kindHeader-arrow'
                     onClick={()=>this.props.history.goBack(-1)}>
                </div>
                <Link className="kindHeader-search"
                      to='/search'
                >
                    <i className='iconfont icon-sousuo1'></i>
                    搜索优选商品
                </Link>
            </div>
        )
    }
}
export default withRouter(KindHeader);