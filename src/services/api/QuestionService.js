import axios from '../../configs/AxiosCustomize.js';

const createQuestionByQuizId = async (question) => {
    return await axios.post("api/v1/question", question, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("question service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

export {createQuestionByQuizId}