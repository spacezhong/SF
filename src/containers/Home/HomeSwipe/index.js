import React,{memo} from 'react';
import Slider from "react-slick";
import './index.less';

function HomeSwipe(props){
    let settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
    };
    let {dataSource}=props;
    return(
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
};
export default memo(HomeSwipe);

/*class HomeSwipe extends React.Component{

    render() {
        let settings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
        };
        let {dataSource}=this.props;

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
export default HomeSwipe;*/