import axiosRetry from "axios-retry";
import axios from "../../configs/AxiosCustomize";

const login = (data) => {
    return axios.post("api/v1/login", data)
        .then(res => {
            console.log("auth service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const register = (data) => {
    return axios.post("api/v1/register", data)
        .then(res => {
            console.log("auth service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const logout = (email, refresh_token) => {
    return axios.post("api/v1/logout", {email, refresh_token})
        .then(res => {
            console.log("auth service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const getDashboardData = () => {
    return axios.get("api/v1/overview")
        .then(res => {
            console.log("auth service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        });
}

const refreshToken = (data) => {
    return axios.post('api/v1/refresh-token', data)
        .then(res => {
            console.log("auth service : ", res);
            return res;
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err);
        });
}

export {
    login, register, logout, getDashboardData, refreshToken
};