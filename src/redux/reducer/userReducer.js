import {FETCH_DATA} from '../action/UserAction';

const INITIAL_STATE = {
    account: {access_token: '', refresh_token: '', username: ''},
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA:
            console.log("action.payload : ", action.payload)
            return {
                ...state, account: action?.payload, isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default userReducer;