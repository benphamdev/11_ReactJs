import _ from "lodash";
import React, { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaRegImage } from "react-icons/fa";
import { LuBadgeMinus, LuBadgePlus } from "react-icons/lu";
import Select from "react-select";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { createAnswerByQuestionId } from "../../../../services/api/AnswerService";
import { createQuestionByQuizId } from "../../../../services/api/QuestionService";
import { getQuizWithQA, retrieveAllQuiz, upsertQuiz } from "../../../../services/api/QuizService";
import { imgSrcBase64, toBase64, urlToFile } from "../../../../utils/Utils";
import "./Questions.scss";

export const Questions = (props) => {
    // const
    const typeAction = ["ADD", "REMOVE"];
    const typeChange = ["QUESTION", "ANSWER"];
    const initQuestion = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ];

    // state
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isZoomed, setIsZoomed] = useState(null);
    const [questions, setQuestions] = useState(initQuestion);
    const [quizzes, setQuizzes] = useState([]);

    // props
    const { isUpdateQuiz, setIsUpdateQuiz } = props;

    // effect
    useEffect(() => {
        getAllQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && isUpdateQuiz !== undefined) {
            getQuizWithQuestion();
        }
    }, [selectedQuiz, isUpdateQuiz]);

    const getAllQuiz = async () => {
        let response = await retrieveAllQuiz();
        if (response && response.EC === 0) {
            let data = response.DT;
            let temp = [];
            data.forEach((item) => {
                return temp.push({ value: `${item.id}`, label: `${item.id} ${item.name}` });
            });
            setQuizzes(temp);
        } else {
            console.log(response);
            toast.error(response.EM);
        }
    };

    const handleQuestion = (type, id) => {
        switch (type) {
            case typeAction[0]:
                let newQuestion = {
                    id: uuidv4(),
                    description: "",
                    imageFile: "",
                    imageName: "",
                    answers: [
                        {
                            id: uuidv4(),
                            description: "",
                            isCorrect: false,
                        },
                    ],
                };
                setQuestions([...questions, newQuestion]);
                break;
            case typeAction[1]:
                let newQuestions = questions.filter((question) => question.id !== id);
                setQuestions(newQuestions);
                break;
            default:
                break;
        }
    };

    const handleAnswer = (type, questionId, answerId) => {
        let cloneQuestions = _.cloneDeep(questions);
        let newQuestion = cloneQuestions.find((question) => question.id === questionId);

        if (type == typeAction[0]) {
            let newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            };
            newQuestion.answers.push(newAnswer);
        } else if (type == typeAction[1])
            newQuestion.answers = newQuestion.answers.filter((answer) => answer.id !== answerId);

        setQuestions(cloneQuestions);
    };

    const handleChange = (e, type, arrId, value) => {
        let cloneQuestions = _.cloneDeep(questions);
        let newQuestion = cloneQuestions.find((question) => question.id === arrId[0]);

        if (!newQuestion) return;

        if (type === typeChange[0]) {
            newQuestion.description = value;
        } else if (type === typeChange[1]) {
            let newAnswer = newQuestion.answers.find((answer) => answer.id === arrId[1]);
            if (e.target.type === "checkbox") newAnswer.isCorrect = value;
            else newAnswer.description = value;
        }

        setQuestions(cloneQuestions);
    };

    const handleUploadImage = (event, questionId) => {
        if (event && event.target.files[0]) {
            // setPreviewImage((URL.createObjectURL(event.target.files[0])));
            // setAvatar(event.target.files[0]);
            let cloneQuestions = _.cloneDeep(questions);
            let newQuestion = cloneQuestions.find((question) => question.id === questionId);
            newQuestion.imageFile = event.target.files[0];
            console.log(event.target.files[0]);
            newQuestion.imageName = event.target.files[0].name;
            setQuestions(cloneQuestions);
        }
    };

    const validateQuiz = () => {
        if (!selectedQuiz.value) {
            toast.error("Please select quiz");
            return true;
        }

        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                toast.error(`Please enter question ${i + 1} description`);
                return true;
            }
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    toast.error(`Please enter question ${i + 1} answer  ${j + 1} description`);
                    return true;
                }
            }
        }
    };

    const handleSubmitQuiz = async () => {
        // validate
        if (validateQuiz()) {
            return;
        }
        // console.log('questions', questions, selectedQuiz);
        if (isUpdateQuiz !== undefined) {
            upsertQuizWithQA();
        } else {
            createQuestion();
        }
    };
    const upsertQuizWithQA = async () => {
        let cloneQuestions = _.cloneDeep(questions);

        for await (const question of cloneQuestions) {
            if (question.imageFile) {
                question.imageFile = await toBase64(question.imageFile);
            }
        }

        let payload = {
            quizId: selectedQuiz.value,
            questions: cloneQuestions,
        };

        let response = await upsertQuiz(payload);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            getQuizWithQuestion();
        } else {
            toast.error(response.EM);
        }
    };

    const createQuestion = async () => {
        try {
            for await (const question of questions) {
                let data = {
                    quiz_id: selectedQuiz.value,
                    description: question.description,
                    questionImage: question.imageFile,
                };
                let response = await createQuestionByQuizId(data);

                // console.log('response', response);

                for await (const answer of question.answers) {
                    let dataAnswer = {
                        question_id: response.DT.id,
                        description: answer.description,
                        correct_answer: answer.isCorrect,
                    };
                    let resAnswer = await createAnswerByQuestionId(dataAnswer);
                    // console.log('resAnswer', resAnswer)
                }
            }
            toast.success("Create quiz success");
            setQuestions(initQuestion);
        } catch (e) {
            toast.error(e.message);
        }
    };
    const getQuizWithQuestion = async () => {
        let response = await getQuizWithQA(selectedQuiz.value);
        if (response && response.EC === 0) {
            let data = response.DT;
            // console.log(data)
            let res = [];
            for await (const question of data.qa) {
                // console.log(question);
                if (question.imageFile) {
                    let file = await urlToFile(
                        `${imgSrcBase64},${question.imageFile}`,
                        `${question.id}`,
                        "image/png+jpg"
                    );
                    question.imageFile = file;
                    question.imageName = `${question.id}.png`;
                }
                res.push(question);
            }
            // console.log(res)
            setQuestions(res);
        } else {
            console.log(response);
            toast.error(response.EM);
        }
    };

    return (
        <>
            <div className={"question-container"}>
                <div className={"title"}>Questions</div>

                <div className={"body"}>
                    <div className={"col-6"}>
                        <label> Select quiz</label>
                        <Select
                            value={selectedQuiz}
                            onChange={setSelectedQuiz}
                            options={quizzes}
                            placeholder={"Select quiz"}
                        />
                    </div>

                    <div className={"my-1"}>Add question</div>

                    {questions &&
                        questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <div className={"create-question my-4"} key={question.id}>
                                    <div className={"question-content"}>
                                        <div className={"form-floating description"}>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label={`description ${index + 1}`}
                                            >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="description"
                                                    value={question.description}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            typeChange[0],
                                                            [question.id, ""],
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <div className={"group-upload"}>
                                            <label htmlFor={`${question.id}`}>
                                                <FaRegImage className={"label-upload"} />
                                            </label>
                                            <input
                                                id={`${question.id}`}
                                                type={"file"}
                                                hidden
                                                onChange={(e) => handleUploadImage(e, question.id)}
                                            />
                                            {question.imageFile ? (
                                                <span onClick={() => setIsZoomed(question)}>
                                                    {question.id}-{question.imageName}
                                                </span>
                                            ) : (
                                                <span>No file upload</span>
                                            )}
                                        </div>

                                        <div className={"gr-btn"}>
                                            <span onClick={() => handleQuestion(typeAction[0], "")}>
                                                <LuBadgePlus className={"btn-add"} />
                                            </span>
                                            {questions.length > 1 && (
                                                <span
                                                    onClick={() => handleQuestion(typeAction[1], question.id)}
                                                >
                                                    <LuBadgeMinus className={"btn-remove"} />
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {question.answers &&
                                        question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div className={"answer-content"} key={answer.id}>
                                                    <input
                                                        className="form-check-input isCorrect"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                        checked={answer.isCorrect}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                typeChange[1],
                                                                [question.id, answer.id],
                                                                e.target.checked
                                                            )
                                                        }
                                                    />

                                                    <div className={"form-floating answer"}>
                                                        <FloatingLabel
                                                            controlId="floatingInput"
                                                            label={`answer ${index + 1}`}
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="answer"
                                                                value={answer.description}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e,
                                                                        typeChange[1],
                                                                        [question.id, answer.id],
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </FloatingLabel>
                                                    </div>

                                                    <div className={"gr-btn"}>
                                                        <span
                                                            onClick={() =>
                                                                handleAnswer(typeAction[0], question.id, "")
                                                            }
                                                        >
                                                            <LuBadgePlus className={"btn-add"} />
                                                        </span>

                                                        {question.answers.length > 1 && (
                                                            <span
                                                                onClick={() =>
                                                                    handleAnswer(
                                                                        typeAction[1],
                                                                        question.id,
                                                                        answer.id
                                                                    )
                                                                }
                                                            >
                                                                <LuBadgeMinus className={"btn-remove"} />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}

                    <button className={"btn btn-warning"} onClick={handleSubmitQuiz}>
                        Submit
                    </button>

                    {!_.isNull(isZoomed) && (
                        <Lightbox
                            image={URL.createObjectURL(isZoomed.imageFile)}
                            title={isZoomed.imageName}
                            onClose={() => setIsZoomed(null)}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
