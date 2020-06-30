import React from 'react';
import Category from "./Category";
import HomeHeader from './HomeHeader';
import HomeSwipe from './HomeSwipe';
import Headline from './Headline';
import Discount from './Discount';
import Menu from './Menu';
import HomeLists from './HomeLists';
import {connect} from 'react-redux';
import {actions} from '../../redux/reducers/home';

class Home extends React.Component{
    componentDidMount() {
        this.props.swipeAPI();
        this.props.categoryAPI();
        this.props.headlineAPI();
        this.props.discountAPI();
        this.props.listAPI();
    }
    render(){
        //如果swipe下面的数据没获取到:
        //第一步必须是先取到state中的某个属性值；
        //再判断这个属性值下是否有data属性，没有就赋值为[],否则传入子组件，子组件里面无法使用map方法；
        //原因是:如果axios没有获取到数据,那么payload就没值，data就没值，需手动设置为[]
        let swipe=this.props.swipe;
        let swipeData=swipe.data?swipe.data:{};
        let homeSwipe=swipeData.homeSwipe?swipeData.homeSwipe:[];
        console.log(homeSwipe);
        //如果categoey下面的数据没获取到：
        let category=this.props.category;
        let categoryData=category.data?category.data:{};
        let homeCategory=categoryData.homeCategory?categoryData.homeCategory:[];
        console.log(homeCategory);
        //如果headline下面的数据没获取到：
        let headline=this.props.headline;
        let headlineData=headline.data?headline.data:{};
        let homeHeadline=headlineData.homeHeadline?headlineData.homeHeadline:[];
        console.log(homeHeadline);
        //如果discount下面的数据没获取到：
        let discount=this.props.discount;
        let discountData=discount.data?discount.data:{};
        console.log(discountData);
        let homeDiscount=discountData.homeDiscount?discountData.homeDiscount:[];
        let {time}=discount;
        let {discountAPI}=this.props;
        console.log(homeDiscount);
        //如果list下面的数据没获取到：
        let list=this.props.list;
        let lists=list.data?list.data:{};
        let homeList=lists.listData?lists.listData:[];
        let {loadingText}=lists;
        console.log(homeList);
        let {listAPI}=this.props;
        console.log(listAPI);

        return(
            <div className='home'>
                <HomeHeader/>
                <HomeSwipe dataSource={homeSwipe}/>
                <Category dataSource={homeCategory}/>
                <Headline dataSource={homeHeadline}/>
                <Discount dataSource={homeDiscount} time={time} discountAPI={discountAPI}/>
                <Menu/>
                <HomeLists dataSource={homeList} loadingText={loadingText} listAPI={listAPI}/>
            </div>
        )
    }
};

export default connect((state)=>({...state.home}),actions)(Home);