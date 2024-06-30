import './ManageQuiz.scss'
import {useRef, useState} from "react";
import {Accordion} from "react-bootstrap";
import Select from 'react-select'
import {toast} from "react-toastify";
import {createNewQuiz} from "../../../../services/api/QuizService";
import {Questions} from "../Question/Questions";
import {AssignQuiz} from "./AssignQuiz";
import TableQuiz from "./TableQuiz";

export const ManageQuiz = () => {
    // constant
    const options = [
        {value: 'EASY', label: 'EASY'},
        {value: 'MEDIUM', label: 'MEDIUM'},
        {value: 'HARD', label: 'HARD'}
    ]

    // state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficult, setDifficult] = useState('EASY');
    const [image, setImage] = useState('');
    const [isAdd, setIsAdd] = useState(false);
    const inputRef = useRef(null);
    const [isUpdateQuiz, setIsUpdateQuiz] = useState(false);

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            // setPreviewImage((URL.createObjectURL(event.target.files[0])));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        if (!name || !description || !difficult || !image) {
            toast.error("Please fill all field")
            return;
        }

        let data = {
            name: name,
            description: description,
            difficulty: difficult?.value,
            quizImage: image
        }

        let response = await createNewQuiz(data);

        if (response && response.EC === 0) {
            toast.success("Create new quiz success")
            console.log(response)
            setName('')
            setDescription('')
            setDifficult('')
            inputRef.current.value = null;
            setIsAdd(true);
        } else {
            toast.error(response.EM)
            console.log(response)
        }
    }

    return (
        <>
            <div className={"quiz-container"}>
                <Accordion defaultActiveKey={[]}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Manage Quiz</Accordion.Header>
                        <Accordion.Body>
                            <div className={"add-new"}>
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">New Quiz</legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="Name" className="form-control" id="floatingInput"
                                            placeholder="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                        <label htmlFor="floatingInput">Name</label>
                                    </div>

                                    <div className="form-floating">
                                        <input
                                            type="text" className="form-control" id="floatingDescription"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <label htmlFor="floatingDescription">Description</label>
                                    </div>

                                    <div>
                                        <Select options={options} className={"mt-3 mb-3"}
                                                placeholder={"Select difficult"}
                                                defaultValue={difficult}
                                                onChange={setDifficult}
                                                value={difficult}
                                        />
                                    </div>

                                    <div className="input-group mb-3">
                                        <input
                                            type="file" className="form-control" id="inputGroupFile02"
                                            ref={inputRef}
                                            onChange={(e) => handleUploadImage(e)}/>
                                        <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-warning"
                                                onClick={() => handleSubmit()}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                </fieldset>
                            </div>

                            <div className={"list-detail"}>
                                <TableQuiz isAdd={isAdd}/>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Q&A</Accordion.Header>

                        <Accordion.Body>
                            <Questions
                                isUpdateQuiz={isUpdateQuiz}
                                setIsUpdateQuiz={setIsUpdateQuiz}
                            />
                        </Accordion.Body>
                        
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assign Quiz For User</Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </>
    )
}