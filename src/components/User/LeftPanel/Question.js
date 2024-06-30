import _ from "lodash";
import React, {useState} from "react";
import Lightbox from "react-awesome-lightbox";

export const Question = (props) => {
    // constant

    // props
    const {question, handleCheckAnswer} = props;   // question = {questionId, description, image, answers}

    // state
    const [isZoomed, setIsZoomed] = useState(false)

    if (question === undefined || question.length === 0) return (<></>);

    // console.log("question", question)
    return (
        <>
            {
                question.image ?
                    <div className={"img-question"}>
                        <img
                            src={`data:image/svg+xml+jpeg+png;base64,${question.image}`}
                            onClick={() => setIsZoomed(true)}
                            style={{cursor: 'pointer'}}
                        />
                        {
                            isZoomed &&
                            <Lightbox
                                image={`data:image/svg+xml+jpeg+png;base64,${question.image}`}
                                title={'Zoom'}
                                onClose={() => setIsZoomed(false)}
                            />
                        }
                    </div>
                    : <div className={"img-question"}></div>
            }

            <div className={"question"}>
                <h4>Question {question?.questionId}</h4>
                <p>{question?.description}</p>
            </div>

            <div className={"q-answers"}>
                {
                    question && question.answers.length > 0 &&
                    question.answers.map((answer, index) => (
                        <div className="form-check q-answer" key={index}>
                            <input className="form-check-input" type="checkbox"
                                   checked={answer.isSelected}
                                   id="flexCheckDefault"
                                   onChange={(e) => {
                                       handleCheckAnswer(e, question.questionId, answer.id);
                                   }}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault"
                                   checked={answer.isSelected}>
                                {answer.description}
                            </label>
                        </div>
                    ))
                }
            </div>
        </>
    )
}