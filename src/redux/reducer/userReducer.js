import {FETCH_DATA, USER_LOGOUT} from '../action/UserAction';

const INITIAL_STATE = {
    account: {access_token: '', refresh_token: '', username: '', role: '', email: '', image: ''},
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA:
            console.log("action.payload : ", action.payload)
            return {
                ...state, account: action?.payload, isAuthenticated: true,
            };
        case USER_LOGOUT:
            return {
                ...state,
                account: {access_token: '', refresh_token: '', username: '', role: '', email: '', image: ''},
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default userReducer;