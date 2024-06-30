import React from "react";
import {Timer} from "./Timer";

export const RightPanelContent = (props) => {
    // props
    const {questions, handleSubmit} = props;

    const onTimeOut = () => {
        handleSubmit();
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
                                <div className={'answer-sheet-item'} key={index}>
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