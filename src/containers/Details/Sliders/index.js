import React,{Component} from "react";
import ReactSwipe from 'react-swipe';
export default class Sliders extends Component{
    render(){
        let imgs=this.props.imgs;
        return(
            <ReactSwipe className="carouselDetail carousel" swipeOptions={{ startSlide: 0,
                speed: 1000,
                auto: 2000,
                effect : 'coverflow',
                slidesPerView: 3,
                continuous: true,
                disableScroll: false,
                stopPropagation: false}} key={imgs.length}>
                {
                    imgs.map((item,index)=>(
                        <img src={item} key={index} alt=""/>
                    ))
                }
            </ReactSwipe>
        )
    }
}