import {useEffect, useState} from "react";
import Select from "react-select";
import {toast} from "react-toastify";
import {getParticipants} from "../../../../services/api/ParticipantService";
import {assignQuizForParticipant, retrieveAllQuiz} from "../../../../services/api/QuizService";

export const AssignQuiz = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [quizzes, setQuizzes] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState(null)

    useEffect(() => {
        getAllQuiz();
        fetchUsers();
    }, []);

    const getAllQuiz = async () => {
        let response = await retrieveAllQuiz();
        console.log('response', response)
        if (response && response.EC === 0) {
            let data = response.DT;
            let temp = []
            data.forEach((item) => {
                return temp.push({value: `${item.id}`, label: `${item.id} ${item.name}`})
            })
            setQuizzes(temp);
        } else {
            console.log(response);
            toast.error(response.EM);
        }
    }

    const fetchUsers = async () => {
        let res = await getParticipants();
        // console.log("ManageUsers list users : ", res);
        if (res.EC === 0) {
            let temp = res.DT.map((item) => {
                return {value: `${item.id}`, label: `${item.id}-${item.username}-${item.email}`}
            })
            setUsers(temp);
        }
    }

    const handleAssign = async () => {
        console.log(selectedQuiz, selectedUser);
        let response = await assignQuizForParticipant({quizId: selectedQuiz.value, userId: selectedUser.value});
        if (response && response.EC === 0) {
            toast.success("Assign quiz success")
            setSelectedUser(null);
            setSelectedQuiz(null);
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <>
            <div className={'assign-user-container row'}>
                <div className={'col-6 form-group'}>
                    <label className={'mb-2'}>Assign quiz</label>
                    <Select
                        options={quizzes}
                        placeholder={"Select quiz"}
                        onChange={setSelectedQuiz}
                        value={selectedQuiz}
                        defaultValue={selectedQuiz}
                    />
                </div>

                <div className={'col-6 form-group'}>
                    <label className={'mb-2'}>Assign user</label>
                    <Select
                        value={selectedUser}
                        defaultValue={selectedUser}
                        options={users}
                        placeholder={"Select user"}
                        onChange={setSelectedUser}
                    />
                </div>

                <div>
                    <button className={'btn btn-warning mt-3'} onClick={handleAssign}>
                        Assign
                    </button>
                </div>
            </div>
        </>
    )
}