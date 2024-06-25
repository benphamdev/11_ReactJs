export const FETCH_DATA = 'FETCH_USER_INFO';

export const doLogin = (payload) => {
    return {
        type: FETCH_DATA,
        payload: payload,
    };
};
