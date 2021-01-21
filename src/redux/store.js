import {createStore} from "redux";
import reducers from './reducers/index';
import {applyMiddleware} from "redux";
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import reduxPromise from 'redux-promise';
//路由中间件的使用:
import {routerMiddleware} from 'react-router-redux';
let createHashHistory=require("history").createHashHistory;
let history=createHashHistory();
let router=routerMiddleware(history);

let store=createStore(reducers,applyMiddleware(router,reduxThunk,reduxLogger,reduxPromise));
export default store;





