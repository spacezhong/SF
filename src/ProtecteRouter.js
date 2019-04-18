import React,{Component} from "react";
import {Route,Redirect} from "react-router-dom"
//判断是否登录
export default function ({component:Component,...rest}) {
    return (
        <Route {...rest} render={({history,location})=>location.state?<Component/>:<Redirect to={{pathname:"/login",state:{from:location.pathname}}}/>
        }/>
    )
}
//ProtectRouter组件是一个高阶组件，它是一个函数，返回值是一个<Route>,渲染的是一个函数返回值：当location.state有值时（如''）,跳转到<Component/>，否则，跳转到“/login“路径对应的组件，并把state属性传给“/login“路径对应的组件。state:{from:location.pathname}中，location.pathname的值为：‘/cart’
/*
this.props.username ?
    <Link to={{pathname: `/cart`, state: this.props.username}}>
        <span>一键购买</span>,这里的state就是登陆后location.state*/
