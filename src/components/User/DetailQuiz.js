import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestionByQuizId} from "../../services/api/QuizService";

export const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.quizId;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions()
    }, [quizId]);

    const fetchQuestions = async () => {
        let response = await getQuestionByQuizId(quizId);

        console.log("detail quiz", response);

        if (response && response.EC === 0) {
            setQuestions(response.DT);
        }
    }

    return (
        <>
            detail quiz
        </>
    )
}