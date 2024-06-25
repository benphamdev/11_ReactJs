import {DECREMENT} from '../action/counterAction';

const INITIAL_STATE = {
    account: {access_token: '', refresh_token: '', username: ''},
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_USER_INFO":
            console.log("action.payload : ", action.payload)
            return {
                ...state, account: action?.payload, isAuthenticated: true,
            };
        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default:
            return state;
    }
};

export default userReducer;