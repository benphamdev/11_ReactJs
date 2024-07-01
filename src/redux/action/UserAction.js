export const FETCH_DATA = 'FETCH_USER_INFO';
export const USER_LOGOUT = 'USER_LOGOUT';
export const doLogin = (payload) => {
    return {
        type: FETCH_DATA,
        payload: payload,
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};
