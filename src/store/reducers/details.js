import * as types from "../action-types";

let initSearch = {
    code: '',
    details: {},
    similar: [],
    comment: {},
    commentID: {},
    success: '',
    carNum: 0
};

export default function (state = initSearch, action) {
    switch (action.type) {
        case types.SEARCH_DETAIL:
            return {...state, ...action.payload};
        case types.FIND_CART:
            return {...state, carNum: action.payload};
        case types.ADD_CART:
            return {...state, carNum: action.payload};
        default :
            return state;
    }


}

