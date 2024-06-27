import {useEffect, useState} from "react";
import {getQuizByParticipantId} from "../../services/api/QuizService";
import './Quiz.scss'
import {useNavigate} from "react-router-dom";

export const Quiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        const response = await getQuizByParticipantId();
        if (response && response.EC === 0) {
            setListQuiz(response.DT);
        }
    }

    return (
        <>
            <div className="list-quiz container">
                {
                    listQuiz.length > 0 && listQuiz.map((quiz, index) => {
                        return (
                            <div className="card" key={index} style={{width: '18rem'}}>
                                <img src={`data:image/svg+xml+png;base64,${quiz.image}`} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{quiz.id}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quiz.id}`)}>Start
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    listQuiz.length === 0 && <div className="col-sm-6">
                        <div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">No quiz available</h5>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}