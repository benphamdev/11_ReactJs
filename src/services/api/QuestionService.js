import axios from '../../configs/AxiosCustomize.js';

const createQuestionByQuizId = async (question) => {
    return await axios.post("api/v1/question", question, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export { createQuestionByQuizId }