import React, { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { imgSrcBase64 } from "../../../utils/Utils";

export const Question = (props) => {
    // constant

    // props
    const { question, handleCheckAnswer, isShowAnswer } = props; // question = {questionId, description, image, answers}

    if (question === undefined || question.length === 0) return <></>;

    // state
    const [isZoomed, setIsZoomed] = useState(false);

    // console.log("question", question)
    return (
        <>
            {question.image ? (
                <div className={"img-question"}>
                    <img
                        src={`${imgSrcBase64},${question.image}`}
                        onClick={() => setIsZoomed(true)}
                        style={{ cursor: "pointer" }}
                    />
                    {isZoomed && (
                        <Lightbox
                            image={`${imgSrcBase64},${question.image}`}
                            title={"Zoom"}
                            onClose={() => setIsZoomed(false)}
                        />
                    )}
                </div>
            ) : (
                <div className={"img-question"}></div>
            )}

            <div className={"question"}>
                <h4>Question {question?.questionId}</h4>
                <p>{question?.description}</p>
            </div>

            <div className={"q-answers"}>
                {question &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => (
                        <div className="form-check q-answer" key={index}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={answer.isSelected}
                                id={`flexCheckDefault ${question.questionId} ${answer.id}`}
                                onChange={(e) => {
                                    handleCheckAnswer(e, question.questionId, answer.id);
                                }}
                                disabled={isShowAnswer}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`flexCheckDefault ${question.questionId} ${answer.id}`}
                                checked={answer.isSelected}
                            >
                                {answer.description}
                            </label>

                            {isShowAnswer && (
                                <>
                                    {!answer.isCorrect && answer.isSelected && (
                                        <AiFillCloseCircle color={"red"} className={"mx-2"} />
                                    )}
                                    {answer.isCorrect && (
                                        <AiFillCheckCircle color={"green"} className={"mx-2"} />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
            </div>
        </>
    );
};
