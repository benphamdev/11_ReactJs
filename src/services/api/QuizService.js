import axios from "../../configs/AxiosCustomize";

const url = "api/v1/quiz-by-participant";
// const accountSelector = useSelector((state) => state.userReducer.account);

const getQuizByParticipantId = () => {
    return axios.get(url)
        .then(res => {
            console.log("quiz service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

export {getQuizByParticipantId};