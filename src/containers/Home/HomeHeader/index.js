import React,{memo,useEffect} from 'react';
import './index.less';
import {Link} from 'react-router-dom';

function HomeHeader(){
    const inputRef = React.createRef();
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[]);
    return(
        <div className="home-header-box">
            <div className="home-header">
                <div  className='home-city'>
                    <i className='iconfont icon-dizhiguanli address'></i>
                    <span className='city-name'>北京</span>
                </div>
                <Link to='/search'>
                    <input type="text" placeholder='  全球特色巡礼'
                           ref={inputRef}
                    />
                </Link>
                <Link to='/personal' className='home-personal '>
                    <i className='iconfont icon-gerenzhongxin right'></i>
                </Link>
            </div>
        </div>
        )
};
export default memo(HomeHeader);

/*class HomeHeader extends React.Component{

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
            <div className="home-header-box">
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
                    <Link to='/personal' className='home-personal '>
                        <i className='iconfont icon-gerenzhongxin right'></i>
                    </Link>
                </div>
            </div>
        )
    }
}
export default HomeHeader;*/
