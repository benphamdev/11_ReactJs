import _ from 'lodash';
import React, {useState} from "react";
import {FloatingLabel} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {FaRegImage} from "react-icons/fa";
import {LuBadgeMinus, LuBadgePlus} from "react-icons/lu";
import "./Questions.scss";
import Select from "react-select";
import {v4 as uuidv4} from 'uuid'

export const Questions = () => {
    // state
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },]
        },
    ]);

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ];

    // const
    const typeAction = ['ADD', 'REMOVE'];
    const typeChange = ['QUESTION', 'ANSWER'];

    const handleQuestion = (type, id) => {
        switch (type) {
            case typeAction[0]:
                let newQuestion = {
                    id: uuidv4(),
                    description: '',
                    imageFile: '',
                    imageName: '',
                    answers: [
                        {
                            id: uuidv4(),
                            description: '',
                            isCorrect: false
                        }]
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
    }

    const handleAnswer = (type, questionId, answerId) => {
        let cloneQuestions = _.cloneDeep(questions);
        let newQuestion = cloneQuestions.find((question) => question.id === questionId);

        if (type == typeAction[0]) {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            newQuestion.answers.push(newAnswer);
        } else if (type == typeAction[1])
            newQuestion.answers = newQuestion.answers.filter((answer) => answer.id !== answerId);

        setQuestions(cloneQuestions);
    }

    const handleChange = (e, string, arrId, value) => {
        let cloneQuestions = _.cloneDeep(questions);
        let newQuestion = cloneQuestions.find((question) => question.id === arrId[0]);

        if (string === typeChange[0]) {
            newQuestion.description = value;
        } else if (string === typeChange[1]) {
            let newAnswer = newQuestion.answers.find((answer) => answer.id === arrId[1]);
            if (e.target.type === 'checkbox')
                newAnswer.isCorrect = value;
            else
                newAnswer.description = value;
        }

        setQuestions(cloneQuestions);
    }

    const handleUploadImage = (event, questionId) => {
        if (event && event.target.files[0]) {
            // setPreviewImage((URL.createObjectURL(event.target.files[0])));
            // setAvatar(event.target.files[0]);s
            let cloneQuestions = _.cloneDeep(questions);
            let newQuestion = cloneQuestions.find((question) => question.id === questionId);
            newQuestion.imageFile = URL.createObjectURL(event.target.files[0]);
            newQuestion.imageName = event.target.files[0].name;
            setQuestions(cloneQuestions);
        }
    }

    const handleSubmitQuiz = () => {
        console.log('questions', questions);
    }

    return (
        <>
            <div className={'question-container'}>
                <div className={'title'}>
                    Questions
                </div>

                <div className={"body"}>
                    <div className={'col-6'}>
                        <label> Select quiz</label>
                        <Select
                            value={selectedQuiz}
                            onChange={selectedQuiz}
                            options={options}
                        />
                    </div>

                    <div className={'my-1'}>
                        Add question
                    </div>

                    {
                        questions && questions.length > 0 && questions.map((question, index) => {

                            return (
                                <div className={'create-question my-4'} key={question.id}>
                                    <div className={'question-content'}>

                                        <div className={'form-floating description'}>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label={`description ${index + 1}`}
                                            >
                                                <Form.Control
                                                    type="text" placeholder="description"
                                                    value={question.description}
                                                    onChange={(e) =>
                                                        handleChange(e, typeChange[0], [question.id, ''], e.target.value)
                                                    }
                                                />
                                            </FloatingLabel>
                                        </div>

                                        <div className={'group-upload'}>
                                            <label htmlFor={`${question.id}`}>
                                                <FaRegImage className={'label-upload'}/>
                                            </label>
                                            <input
                                                id={`${question.id}`}
                                                type={'file'} hidden
                                                onClick={(e) => handleUploadImage(e, question.id)}
                                            />
                                            {
                                                question.imageFile
                                                    ? <span>{question.imageName}</span>
                                                    : <span>No file upload</span>
                                            }

                                        </div>

                                        <div className={'gr-btn'}>
                                            <span onClick={() => handleQuestion(typeAction[0], '')}>
                                                <LuBadgePlus className={'btn-add'}/>
                                            </span>
                                            {
                                                questions.length > 1 &&
                                                <span onClick={() => handleQuestion(typeAction[1], question.id)}>
                                                <LuBadgeMinus className={'btn-remove'}/>
                                             </span>
                                            }

                                        </div>
                                    </div>

                                    {
                                        question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div className={"answer-content"} key={question.answers.id}>
                                                    <input
                                                        className="form-check-input isCorrect" type="checkbox"
                                                        id="flexCheckDefault"
                                                        checked={answer.isCorrect}
                                                        onChange={(e) => handleChange(e, typeChange[1], [question.id, answer.id], e.target.checked)}
                                                    />

                                                    <div className={'form-floating answer'}>
                                                        <FloatingLabel
                                                            controlId="floatingInput"
                                                            label={`answer ${index + 1}`}
                                                        >
                                                            <Form.Control
                                                                type="text" placeholder="answer"
                                                                value={answer.description}
                                                                onChange={(e) =>
                                                                    handleChange(e, typeChange[1], [question.id, answer.id], e.target.value)
                                                                }
                                                            />
                                                        </FloatingLabel>
                                                    </div>

                                                    <div className={'gr-btn'}>
                                                        <span
                                                            onClick={() => handleAnswer(typeAction[0], question.id, '')}>
                                                            <LuBadgePlus className={'btn-add'}/>
                                                        </span>

                                                        {
                                                            question.answers.length > 1 &&
                                                            <span
                                                                onClick={() => handleAnswer(typeAction[1], question.id, answer.id)}>
                                                            <LuBadgeMinus className={'btn-remove'}/>
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                    <button
                        className={'btn btn-warning'}
                        onClick={handleSubmitQuiz}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}