import './ManageQuiz.scss'
import Select from 'react-select'
import {useRef, useState} from "react";
import {createNewQuiz} from "../../../../services/api/QuizService";
import {toast} from "react-toastify";
import TableQuiz from "./TableQuiz";
import {Accordion} from "react-bootstrap";

export const ManageQuiz = () => {
    // state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficult, setDifficult] = useState('EASY');
    const [image, setImage] = useState('');
    const inputRef = useRef(null);

    const options = [
        {value: 'EASY', label: 'EASY'},
        {value: 'MEDIUM', label: 'MEDIUM'},
        {value: 'HARD', label: 'HARD'}
    ]

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
        } else {
            toast.error(response.EM)
            console.log(response)
        }
    }

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className={"add-new"}>
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">New Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input type="Name" className="form-control" id="floatingInput"
                                           placeholder="name"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>

                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingDescription"
                                           placeholder="Description"
                                           value={description}
                                           onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label htmlFor="floatingDescription">Description</label>
                                </div>

                                <div>
                                    <Select options={options} className={"mt-3 mb-3"} placeholder={"Select difficult"}
                                            defaultValue={difficult}
                                            onChange={setDifficult}
                                            value={difficult}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" id="inputGroupFile02"
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className={"quiz-container"}>
                <div className={"list-detail"}>
                    <TableQuiz/>
                </div>
            </div>
        </>
    )
}