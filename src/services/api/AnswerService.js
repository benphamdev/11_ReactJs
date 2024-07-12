import axios from '../../configs/AxiosCustomize.js';

const submitAnswer = (data) => {
    return axios.post("api/v1/quiz-submit", data);
}

const createAnswerByQuestionId = async data => {
    return await axios.post("api/v1/answer", data);
}

export { submitAnswer, createAnswerByQuestionId };