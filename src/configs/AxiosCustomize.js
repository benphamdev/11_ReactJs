// Set config defaults when creating the instance
import axios from "axios";
import 'nprogress/nprogress.css';
import nprogress from 'nprogress';
import './nprogressConfig';
import {store} from "../redux/store";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: 3});

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Alter defaults after instance has been created
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("state", store.getState());
    const token = store.getState()?.userReducer?.account?.access_token;
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    nprogress.start();
    return config;
}, function (error) {
    // Do something with request error
    nprogress.done();
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response)
    nprogress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    nprogress.done();
    if (error.response.data && error.response.data.EC === -999) {
        store.dispatch({type: 'LOGOUT'});
    }
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;
