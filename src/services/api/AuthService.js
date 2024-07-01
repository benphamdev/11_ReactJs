import axios from "../../configs/AxiosCustomize";

const login = (data) => {
    return axios.post("api/v1/login", data)
        .then(res => {
            console.log("api service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const register = (data) => {
    return axios.post("api/v1/register", data)
        .then(res => {
            console.log("api service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const logout = (email, refresh_token) => {
    return axios.post("api/v1/logout", {email, refresh_token})
        .then(res => {
            console.log("api service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

export {
    login, register, logout
};