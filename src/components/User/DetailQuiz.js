import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestionByQuizId} from "../../services/api/QuizService";
import _ from "lodash";

export const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.quizId;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions()
    }, [quizId]);

    const fetchQuestions = async () => {
        let response = await getQuestionByQuizId(quizId);

        if (response && response.EC === 0) {
            let rawQuestions = response.DT;

            // way not using lodash
            // console.log("raw questions", rawQuestions);
            let groupQuestions = Map.groupBy(rawQuestions, question => question.id);
            // console.log("group questions", groupQuestions);
            // let ans = Array.from(groupQuestions, ([key, value]) => {
            //     let answers = value.map(question => ({
            //         answerId: question.answers.id,
            //         description: question.answers.description,
            //     }));
            //     return {
            //         questionId: key,
            //         description: value[0].description,
            //         image: value[0].image || '',
            //         answers: answers,
            //     }
            // });

            // way using lodash
            let ans = _.chain(rawQuestions)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    value.forEach((item) => answers.push(item.answers));
                    return {
                        questionId: key,
                        description: value[0].description || '',
                        image: value[0].image || '',
                        answers: answers || [],
                    }
                })
                .value();
            console.log("ans", ans);
            setQuestions(ans);
        }
    }

    return (
        <>
            detail quiz
        </>
    )
}