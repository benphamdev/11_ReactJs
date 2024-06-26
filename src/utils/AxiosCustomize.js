// Set config defaults when creating the instance
import axios from "axios";
import 'nprogress/nprogress.css';
import nprogress from 'nprogress';
import '../configs/nprogressConfig';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

// Alter defaults after instance has been created
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // NProgress.start();
    // Do something before request is sent
    nprogress.start();
    return config;
}, function (error) {
    // Do something with request error
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
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});


export default instance;
