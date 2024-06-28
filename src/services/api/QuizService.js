import axios from "../../configs/AxiosCustomize";

const getQuizByParticipantId = () => {
    return axios.get("api/v1/quiz-by-participant")
        .then(res => {
            console.log("quiz service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const getQuestionByQuizId = (quizId) => {
    return axios({method: 'get', url: 'api/v1/questions-by-quiz', params: {quizId}})
        .then(res => {
            console.log("quiz service : ", res);
            return res;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

const createNewQuiz = (data) => {
    return axios.post("api/v1/quiz", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const retrieveAllQuiz = () => {
    return axios.get("api/v1/quiz/all")
        .then(res => {
            console.log("quiz service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

export {getQuizByParticipantId, getQuestionByQuizId, createNewQuiz, retrieveAllQuiz};