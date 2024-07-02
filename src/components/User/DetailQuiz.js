import _ from "lodash";
import {useEffect, useState} from "react";
import {Breadcrumb} from "react-bootstrap";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {getQuestionByQuizId} from "../../services/api/QuizService";
import "./DetailQuizz.scss";
import {Question} from "./LeftPanel/Question";
import {submitAnswer} from "../../services/api/AnswerService";
import {toast} from "react-toastify";
import ModalSubmitAnswer from "./LeftPanel/ModalSubmitAnswer";
import {RightPanelContent} from "./RightPanel/RightPanelContent";

export const DetailQuiz = () => {
    // hooks
    const params = useParams();
    const quizId = params.quizId;
    const location = useLocation();
    const quizName = location?.state?.quizName;

    // state
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showModalSubmitAnswer, setShowModalSubmitAnswer] = useState(false);
    const [answerQuiz, setAnswerQuiz] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [listCorrectAnswer, setListCorrectAnswer] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const response = await getQuestionByQuizId(quizId);

        if (response && response.EC === 0) {
            const rawQuestions = response.DT;

            // way not using lodash
            console.log("raw questions", rawQuestions);
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
                        item.answers.isCorrect = false;
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
            // console.log("ans", ans);
            setQuestions(ans);
        }
    };

    const handleCheckAnswer = (e, questionId, answerId) => {
        // console.log(e.target.checked, questionId, answerId);
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

    const handleSubmit = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };

        questions.forEach((question) => {
            let answers = [];
            question.answers.forEach((answer) => {
                if (answer.isSelected) answers.push(+answer.id)
            });
            payload.answers.push({
                questionId: +question.questionId,
                userAnswerId: answers
            });
        })

        console.log("payload", payload)

        let response = await submitAnswer(payload);
        if (response && response.EC === 0) {
            toast.success("Submit answer successfully");
            console.log("detail quiz", response);
            setShowModalSubmitAnswer(true);
            let res = response.DT;

            const quizData = res.quizData;

            setListCorrectAnswer(quizData);

            console.log(quizData)

            for (let i = 0; i < questions.length; i++) {
                let question = questions[i];
                // console.log(question)
                if (quizData[i].isCorrect) {
                    for (let j = 0; j < question.answers.length; j++) {
                        question.answers[j].isCorrect = question.answers[j].isSelected;
                    }
                } else {
                    quizData[i].systemAnswers.forEach((item) => {
                        for (let j = 0; j < question.answers.length; j++) {
                            if (question.answers[j].id === item.id) {
                                question.answers[j].isCorrect = true;
                                break;
                            }
                        }
                    })
                }
            }
            // console.log(res);
            setAnswerQuiz(res);
            setIsSubmit(true);
        } else {
            toast.error("Submit answer failed");
        }
    }

    return (
        <>
            <Breadcrumb className={'breadcrumb'}>
                <NavLink to={'/'} className={'breadcrumb-item'}>
                    Home
                </NavLink>
                <NavLink to={'/users'} className={'breadcrumb-item'}>
                    User
                </NavLink>
                <Breadcrumb.Item active>
                    Quiz {quizId}
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className={"detail-quiz-container"}>

                <div className={"left-content"}>

                    <div className={"title"}>
                        Quiz {quizId} : {quizName}
                    </div>

                    <hr/>

                    <div className={"q-content"}>
                        <Question
                            question={(questions && questions.length > 0) ? questions[currentQuestion] : []}
                            handleCheckAnswer={handleCheckAnswer}
                            isShowAnswer={isShowAnswer}
                        />
                    </div>

                    <div className={"footer"}>
                        <button className={"btn btn-secondary"} onClick={handlePrevQuestion}>Prev</button>

                        <button className={"btn btn-primary"} onClick={handleNextQuestion}>Next</button>

                        <button className={"btn btn-warning"} onClick={handleSubmit} disabled={isSubmit}>Submit</button>
                    </div>
                </div>

                <div className={"right-content"}>
                    <RightPanelContent
                        questions={questions}
                        handleSubmit={handleSubmit}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        isShowAnswer={isShowAnswer}
                        listCorrectAnswer={listCorrectAnswer}
                    />
                </div>

                <ModalSubmitAnswer
                    show={showModalSubmitAnswer}
                    setShow={setShowModalSubmitAnswer}
                    answerQuiz={answerQuiz}
                    setIsShowAnswer={setIsShowAnswer}
                />
            </div>
        </>
    );
};
