import React from 'react';
import BottomBar from './components/BottomBar';
import Home from './containers/Home';
import Kind from './containers/Kind';
import Detail from './containers/Detail';
import Change from './containers/Change';
import Personal from './containers/Personal';
import Classification from './containers/Classification';
import Reg from './containers/Reg';
import Login from './containers/Login';
import Search from './components/Search';
import Collect from './containers/Collect';
import SearchList from './components/Search/SearchList';
import MenuVideo from "./containers/Home/MenuVideo";
import Cart from "./containers/Cart";
import ProtectRouter from './ProtectRouter';
import CollectRouter from './CollectRouter';

import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
let createHashHistory=require("history").createHashHistory;
let history=createHashHistory();

class App extends React.Component{
    render(){
        return(
            <ConnectedRouter history={history}>
                <div>
                    <BottomBar/>
                    <Switch>
                        <Route path='/' exact component={Home}/>
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
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }
}
export default App;