import axiosRetry from "axios-retry";
import axios from "../../configs/AxiosCustomize";

const login = (data) => {
    return axios.post("api/v1/login", data);
}

const register = (data) => {
    return axios.post("api/v1/register", data);
}

const logout = (email, refresh_token) => {
    return axios.post("api/v1/logout", { email, refresh_token });
}

const getDashboardData = () => {
    return axios.get("api/v1/overview");
}

const refreshToken = (data) => {
    return axios.post('api/v1/refresh-token', data);
}

const changePassword = (data) => {
    return axios.post('api/v1/change-password', data);
}

const updateProfile = (data) => {
    return axios({
        method: 'post',
        url: 'api/v1/profile',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const getHistoryQuiz = () => {
    return axios.get("api/v1/history");
}

export {
    login, register, logout, getDashboardData, refreshToken, changePassword, updateProfile,
    getHistoryQuiz
};