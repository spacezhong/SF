import home from './home';
import kind from './kind';
import searchTotal from './search';
import detail from './detail';
import classification from './classification';
import personal from './personal';
import collect from './collect';
import cart from './cart';
import bottomBar from './bottombar';
import {combineReducers} from 'redux';
import produce from 'immer';
//import {combineReducers} from 'redux-immer';

//let rootReducer:Reducer<CombinedState,any>=combineReducers<CombinedState>(produce,reducers);

let reducer={
    home,
    kind,
    searchTotal,
    classification,
    detail,
    personal,
    collect,
    cart,
    bottomBar,
};
let reducers=combineReducers(
    reducer
);
export default reducers;