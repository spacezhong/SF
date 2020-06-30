import {combineReducers} from "redux";
import home from './home';
import kind from './kind';
import searchTotal from './search';
import detail from './detail';
import classification from './classification';
import personal from './personal';
import collect from './collect';
import cart from './cart';
import bottomBar from './bottombar';
let reducers=combineReducers({
    home,
    kind,
    searchTotal,
    classification,
    detail,
    personal,
    collect,
    cart,
    bottomBar,

});
export default reducers;