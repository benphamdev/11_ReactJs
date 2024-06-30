import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {formatTime} from "../../../utils/Utils";

export const Timer = (props) => {
    // state
    const [time, setTime] = useState(10000);

    useEffect(() => {
        if (time === 0) {
            toast.error("Time out")
            props.onTimeOut();
            return;
        }

        const interval = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <>
            <div>
                {formatTime(time)}
            </div>
        </>
    )
}