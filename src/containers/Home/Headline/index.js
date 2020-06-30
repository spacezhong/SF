import React from 'react';
import './index.less';
import Slider from "react-slick";

class Headline extends React.Component{
    render(){
        const settings = {
            dots: true,
            arrow:false,
            speed:1000,
            slidesToShow: 1,
            swipeToSlide:1,
            autoplay:true,
            vertical:true,//垂直播放
        };
        let {dataSource}=this.props;
        return(
            <div className="headline">
                <div className="headline-logo"></div>
                <div className="headline-sliders">
                    <Slider {...settings} >
                        {
                            dataSource.map((item,index)=>{
                                return(
                                    <div className="headline-item clearfix" key={index}>
                                        <div className="headline-item-title">{item.title}</div>
                                        <img src={item.pic} alt="" className="headline-item-img"/>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        )
    }
}
export default Headline;