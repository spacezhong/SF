import React from 'react';
import Slider from "react-slick";
import './index.less';

class HomeSwipe extends React.Component{

    render() {
        let settings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
        };
        let {dataSource}=this.props;
        console.log(dataSource);
        return (
            <div className="homeSwipe">
                <div className="homeSwipe-content">
                    <Slider {...settings}>
                        {
                            dataSource.map((item,index)=>{
                                return(
                                    <div className="homeSwipe-item" key={index}>
                                        <img src={item} alt="" className="homeSwipe-item-img"/>
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
export default HomeSwipe;