import React,{memo} from 'react';
import './index.less';
import img1 from './img/1.jpg';
import {Link} from 'react-router-dom';
const dataSource={
    hasMore: true,
    menuList: [
        {
            id: 1,
            title: '今日菜谱——大阪烧',
            "video":"https://v01.sfbest.com/job_31%E5%A4%A7%E9%98%AA%E7%83%A7%20Homemade%20Okonomiyaki%20Recipe.mp4",
            poster:img1,
            info:"大阪烧",
            describe: '大阪烧本质上是很松散的蔬菜煎饼，香脆酥软，口感丰富。',
        }
    ]
};

function Menu(){

    return(
        <div className="menu">
            <div className="menu-top">
                <div className="menu-line"></div>
                <div className="menu-name">♦&nbsp;每日菜谱&nbsp;♦</div>
                <div className="menu-line"></div>
            </div>
            <p className="menu-middle">跟私房大厨&nbsp;做舌尖盛宴</p>
            <Link  to='/menuVideo' className="food">
                <img src={dataSource.menuList[0].poster} alt="" className="food-img"/>
                <div className="food-title">{dataSource.menuList[0].title}</div>
                <div className="food-content-style">视&nbsp;频</div>
            </Link>
        </div>
        )
};
export default memo(Menu);

/*
class Menu extends React.Component{
    render(){
        return(
            <div className="menu">
                <div className="menu-top">
                    <div className="menu-line"></div>
                    <div className="menu-name">♦&nbsp;每日菜谱&nbsp;♦</div>
                    <div className="menu-line"></div>
                </div>
                <p className="menu-middle">跟私房大厨&nbsp;做舌尖盛宴</p>
                <Link  to='/menuVideo' className="food">
                    <img src={dataSource.menuList[0].poster} alt="" className="food-img"/>
                    <div className="food-title">{dataSource.menuList[0].title}</div>
                    <div className="food-content-style">视&nbsp;频</div>
                </Link>
            </div>
        )
    }
}
export default Menu;
*/
