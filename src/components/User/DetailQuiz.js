import _ from "lodash";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getQuestionByQuizId} from "../../services/api/QuizService";
import "./DetailQuizz.scss";
import {Question} from "./Question";

export const DetailQuiz = () => {
    // hooks
    const params = useParams();
    const quizId = params.quizId;
    const location = useLocation();
    const quizName = location?.state?.quizName;

    // state
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const response = await getQuestionByQuizId(quizId);

        if (response && response.EC === 0) {
            const rawQuestions = response.DT;

            // way not using lodash
            // console.log("raw questions", rawQuestions);
            // const groupQuestions = Map.groupBy(
            //     rawQuestions,
            //     (question) => question.id,
            // );
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
                    value.forEach((item) => {
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });

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

    const handleCheckAnswer = (e, questionId, answerId) => {
        console.log(e.target.checked, questionId, answerId);
        let cloneQuestions = _.cloneDeep(questions);
        let question = cloneQuestions.find((question) => +question.questionId === +questionId);

        if (question && question.answers) {
            let answer = question.answers.find((answer) => +answer.id === +answerId);
            answer.isSelected = e.target.checked;
            setQuestions(cloneQuestions);
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

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
                        <Question
                            question={
                                (questions && questions.length > 0)
                                    ? questions[currentQuestion] : []
                            }

                            handleCheckAnswer={handleCheckAnswer}
                        />
                    </div>

                    <div className={"footer"}>
                        <button className={"btn btn-secondary"}
                                onClick={handlePrevQuestion}
                        >
                            Prev
                        </button>

                        <button className={"btn btn-primary"}
                                onClick={handleNextQuestion}
                        >Next
                        </button>

                        <button className={"btn btn-warning"}
                                onClick={handleNextQuestion}
                        >Finish
                        </button>
                    </div>
                </div>

                <div className={"right-content"}>count down</div>
            </div>
        </>
    );
};
