import {createStore,applyMiddleware} from "redux";
import reducers from "./reducers"
import logger from "redux-logger"; //logger中间件
import thunk from "redux-thunk";  //thunk 中间件
import promise from "redux-promise"; //promise 中间件

import {routerMiddleware} from "react-router-redux"
import createHistory from "history/createHashHistory"
const history=createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let router=routerMiddleware(history);//路由中间件

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(router,logger,thunk,promise))
);
window.store=store;
export default store;


