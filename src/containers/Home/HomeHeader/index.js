import React from 'react';
import './index.less';
import {Link} from 'react-router-dom';
class HomeHeader extends React.Component{

    constructor(props){
        super(props);
        this.inputRef = React.createRef();//{current: null};
    };
    componentDidMount() {
        if(this.inputRef.current){
            this.inputRef.current.focus()
        }
    };
    render(){
        return(
            <div className="home-header">
                <div  className='home-city'>
                    <i className='iconfont icon-dizhiguanli address'></i>
                    <span className='city-name'>北京</span>
                </div>
                <Link to='/search'>
                    <input type="text" placeholder='  全球特色巡礼'
                           ref={this.inputRef}//{{current: null}};
                    />
                </Link>
                <Link to='/personal' className='home-personal'>
                    <i className='iconfont icon-gerenzhongxin right'></i>
                </Link>
            </div>
        )
    }
}
export default HomeHeader;