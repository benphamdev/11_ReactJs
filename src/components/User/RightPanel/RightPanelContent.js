import React, {useState} from "react";
import {Timer} from "./Timer";

export const RightPanelContent = (props) => {
    // constant
    const typeClassAnsSheet = [
        'answer-sheet-item selected', 'answer-sheet-item clicked',
        'answer-sheet-item correct', 'answer-sheet-item wrong',
        'answer-sheet-item'
    ];

    // props
    const {questions, handleSubmit} = props;

    // state
    const [isStay, setIsStay] = useState(0);

    const onTimeOut = () => {
        handleSubmit();
    }

    const getClassName = (question, index) => {
        console.log("question", question)

        let dataAnswer = question.answers;
        for (const dataAnswerKey in dataAnswer) {
            if (dataAnswer[dataAnswerKey].isSelected)
                return typeClassAnsSheet[0];
        }
        if (isStay === index) {
            return typeClassAnsSheet[1];
        }
        return typeClassAnsSheet[4];
    };

    // handle is clicked
    const handleStay = (index) => {
        props.setCurrentQuestion(index);
        setIsStay(index);
    }

    return (
        <>
            <div className="right-panel">
                <div className={'count-down-timer'}>
                    <Timer onTimeOut={onTimeOut}/>
                </div>

                <hr/>
                <div className={'answer-sheet'}>
                    {
                        questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <div
                                    key={index}
                                    className={getClassName(question, index)}
                                    onClick={() => handleStay(index)}
                                >
                                    {index + 1}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}