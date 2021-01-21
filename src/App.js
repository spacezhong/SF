import React, {Suspense, memo} from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import store from './redux/store';

const BottomBar = React.lazy(() => import('./components/BottomBar'));
const Home = React.lazy(() => import('./containers/Home'));
const Kind = React.lazy(() => import('./containers/Kind'));
const Detail = React.lazy(() => import('./containers/Detail'));
const Change = React.lazy(() => import( './containers/Change'));
const Personal = React.lazy(() => import('./containers/Personal'));
const Classification = React.lazy(() => import('./containers/Classification'));
const Reg = React.lazy(() => import('./containers/Reg'));
const Login = React.lazy(() => import('./containers/Login'));
const Search = React.lazy(() => import('./components/Search'));
const Collect = React.lazy(() => import('./containers/Collect'));
const SearchList = React.lazy(() => import('./components/Search/SearchList'));
const MenuVideo = React.lazy(() => import("./containers/Home/MenuVideo"));
const Cart = React.lazy(() => import("./containers/Cart"));
const ProtectRouter = React.lazy(() => import('./ProtectRouter'));
const CollectRouter = React.lazy(() => import('./CollectRouter'));

function App(){
    return (
            <Provider store={store}>
                    <Suspense fallback={<div></div>}>
                        <Router>
                            <div>
                                <Switch>
                                    <Route path='/home' component={props=><Home {...props}/>}/>
                                    <ProtectRouter path='/cart' component={props=><Cart {...props}/>}/>
                                    <CollectRouter path='/collect' component={props=><Collect {...props}/>}/>
                                    <Route path='/detail/:id' exact component={props=><Detail {...props}/>} />
                                    <Route path='/menuVideo' component={props=><MenuVideo {...props}/>}/>
                                    <Route path='/kind' exact component={props=><Kind {...props}/>}/>
                                    <Route path='/personal' component={props=><Personal {...props}/>}/>
                                    <Route path='/reg' component={props=><Reg {...props}/>}/>
                                    <Route path='/login' component={props=><Login {...props}/>}/>
                                    <Route path="/changepassword" component={props=><Change {...props}/>}/>
                                    <Route path='/search' component={props=><Search {...props}/>}/>
                                    <Route path='/searchList/:value' component={props=><SearchList {...props}/>}/>
                                    <Route path='/kind/classification/:title' exact component={props=><Classification {...props}/>}/>
                                    <Redirect from='/' to='/home'/>
                                </Switch>
                                <BottomBar/>
                            </div>
                        </Router>
                    </Suspense>
            </Provider>
    )
};
export default memo(App);

/*class App extends React.Component{
    render(){
        return(
                <Router>
                    <div>
                        <BottomBar/>
                        <Suspense fallback={<div>'正在加载'</div>}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <ProtectRouter path='/cart' component={Cart}/>
                                <CollectRouter path='/collect' component={Collect}/>
                                <Route path='/detail/:id' exact component={Detail}/>
                                <Route path='/menuVideo' component={MenuVideo}/>
                                <Route path='/kind' exact component={Kind}/>
                                <Route path='/personal' component={Personal}/>
                                <Route path='/reg' component={Reg}/>
                                <Route path='/login' component={Login}/>
                                <Route path="/changepassword" component={Change}/>
                                <Route path='/search' component={Search}/>
                                <Route path='/searchList/:value' component={SearchList}/>
                                <Route path='/kind/classification/:title' exact component={Classification}/>
                                <Redirect from='/' to='/home' exact/>
                            </Switch>
                        </Suspense>
                    </div>
                </Router>
        )
    }
};
export default App;*/

/*
import {ConnectedRouter} from 'react-router-redux';
let createHashHistory=require("history").createHashHistory;
let history=createHashHistory();
*/


