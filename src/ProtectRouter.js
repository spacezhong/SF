import React,{Component} from 'react';
import {Route, Redirect, Link} from "react-router-dom";
import Cart from "./containers/Cart";
//<Link className="iconfont icon-cart detailCarBar-pic"
//      to={{pathname:`/cart`,state:username}}
//>

/*<ProtectRouter path='/cart' component={Cart}/>
 <Route path='/cart' render={}/>
*/

export default  function({component:Component,...rest}){
    return (
        <Route {...rest}
               render={
                   ({history,location})=>location.state?
                      <Component/>:<Redirect to={{pathname:'/login',state:{from:location.pathname}}}/>
               }
        />
    )
};

