import axios from '../../configs/AxiosCustomize.js';

const submitAnswer = (data) => {
    return axios.post("api/v1/quiz-submit", data)
        .then(res => {
            console.log("Quiz service : ", res);
            return res;
        })
        .catch(err => {
            console.log("quiz service", err)
            return Promise.reject(err);
        })
}

export {submitAnswer};