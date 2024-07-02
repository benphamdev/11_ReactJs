import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getHistoryQuiz} from "../../services/api/AuthService";
import {convertTimeToISO} from "../../utils/Utils";

export const History = () => {
    const [dataHistory, setDataHistory] = useState([])

    useEffect(() => {
        retrieveHistoryTest();
    }, []);

    const retrieveHistoryTest = async () => {
        let response = await getHistoryQuiz();
        if (response && response.EC === 0) {
            setDataHistory(response.DT.data);
        } else {
            toast.error(response.EM);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>History Test</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Test Name</th>
                                <th scope="col">Total Question</th>
                                <th scope="col">Total Answer</th>
                                <th scope="col">Correct Answer</th>
                                <th scope="col">Created At</th>
                                <th scope="col">ParticipantId</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataHistory.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.quizHistory.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.totalAnswer}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{convertTimeToISO(item.createdAt)}</td>
                                    <td>{item.participant_id}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}