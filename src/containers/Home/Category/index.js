import React from 'react';
import Slider from "react-slick";
import './index.less';

class Category extends React.Component{

    render(){
        const settings = {
            dots: true,
            arrow:false,
            speed:500,
            slidesToShow: 1,
            swipeToSlide:1,
            autoplay:false,
        };
        let {dataSource}=this.props;
        return(
                <Slider {...settings} >
                    {
                        dataSource.map((section,index)=>{
                            return(
                                <div className='category-section' key={index}>
                                    {
                                        section.map((item,index)=>{
                                            return(
                                                <a className='category-item' key={index}>
                                                    <img src={item.src} alt="" className='category-img'/>
                                                    <div className="category-title">{item.name}</div>
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </Slider>

        )
    }
}
export default Category;