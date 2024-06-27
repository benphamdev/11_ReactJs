import _ from "lodash";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getQuestionByQuizId} from "../../services/api/QuizService";
import "./DetailQuizz.scss";

export const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.quizId;
    const location = useLocation();
    const quizName = location?.state?.quizName;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const response = await getQuestionByQuizId(quizId);

        if (response && response.EC === 0) {
            const rawQuestions = response.DT;

            // way not using lodash
            // console.log("raw questions", rawQuestions);
            const groupQuestions = Map.groupBy(
                rawQuestions,
                (question) => question.id,
            );
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
            const ans = _.chain(rawQuestions)
                .groupBy("id")
                .map((value, key) => {
                    const answers = [];
                    value.forEach((item) => answers.push(item.answers));
                    return {
                        questionId: key,
                        description: value[0].description || "",
                        image: value[0].image || "",
                        answers: answers || [],
                    };
                })
                .value();
            console.log("ans", ans);
            setQuestions(ans);
        }
    };

    return (
        <>
            <div className={"detail-quiz-container"}>
                <div className={"left-content"}>

                    <div className={"title"}>
                        <h1>Quiz {quizId} : {quizName}</h1>
                    </div>

                    <hr/>

                    <div className={"q-body"}>
                        <img/>
                    </div>

                    <div className={"q-content"}>
                        <div className={"question"}>
                            <h4>Question 1</h4>
                            <p>What is the capital of Vietnam?</p>
                        </div>

                        <div className={"q-answers"}>
                            <div className={"q-answer"}>
                                <input type={"radio"} name={"answer"} value={"Hanoi"}/>
                                <label>Hanoi</label>
                            </div>
                            <div className={"q-answer"}>
                                <input type={"radio"} name={"answer"} value={"Hanoi"}/>
                                <label>Hanoi</label>
                            </div>
                            <div className={"q-answer"}>
                                <input type={"radio"} name={"answer"} value={"Hanoi"}/>
                                <label>Hanoi</label>
                            </div>
                            <div className={"q-answer"}>
                                <input type={"radio"} name={"answer"} value={"Hanoi"}/>
                                <label>Hanoi</label>
                            </div>
                        </div>
                    </div>

                    <div className={"footer"}>
                        <button className={"btn btn-secondary"}>Prev</button>
                        <button className={"btn btn-pr"}>Next</button>
                    </div>
                </div>

                <div className={"right-content"}>count down</div>
            </div>
        </>
    );
};
