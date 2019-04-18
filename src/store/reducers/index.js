import {combineReducers} from "redux"
import search from "./search";
import home from "./home";
import list from "./list";

import classification from './classification'
import personal from "./personal";
import detail from './details';

import cart from './cart'

let reducers = combineReducers({
    search, home, list, classification, detail, personal,cart
})

export default reducers;