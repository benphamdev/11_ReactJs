import axios from "../../configs/AxiosCustomize";

const getQuizByParticipantId = () => {
    return axios.get("api/v1/quiz-by-participant");
}

const getQuestionByQuizId = (quizId) => {
    return axios({ method: 'get', url: 'api/v1/questions-by-quiz', params: { quizId } });
}

const createNewQuiz = (data) => {
    return axios.post("api/v1/quiz", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const retrieveAllQuiz = () => {
    return axios.get("api/v1/quiz/all");
}

const deleteQuizById = (quizId) => {
    return axios({
        method: 'delete',
        url: `api/v1/quiz/${quizId}`,
    });
}

const updateQuiz = (data) => {
    return axios.put("api/v1/quiz", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const assignQuizForParticipant = (data) => {
    return axios.post("api/v1/quiz-assign-to-user", data)
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const upsertQuiz = (data) => {
    return axios.post("api/v1/quiz-upsert-qa", data);
}

export {
    getQuizByParticipantId, getQuestionByQuizId, createNewQuiz, retrieveAllQuiz,
    deleteQuizById, updateQuiz, assignQuizForParticipant, getQuizWithQA, upsertQuiz
};