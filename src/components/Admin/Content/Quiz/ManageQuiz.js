import './ManageQuiz.scss'
import Select from 'react-select'
import {useState} from "react";

export const ManageQuiz = () => {
    // state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficult, setDifficult] = useState('EASY');
    const [avatar, setAvatar] = useState('');

    const options = [
        {value: 'EASY', label: 'EASY'},
        {value: 'MEDIUM', label: 'MEDIUM'},
        {value: 'HARD', label: 'HARD'}
    ]

    const handleUploadImage = (event) => {
        if (event) {
            // setPreviewImage((URL.createObjectURL(event.target.files[0])));
            // setAvatar(event.target.files[0]);
        }
    }

    return (
        <>
            <div className={"quiz-container"}>
                <div className={"title"}>
                    Manage Quiz
                </div>

                <hr/>

                <div className={"add-new"}>
                    <form>
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
                                <input type="text" className="form-control" id="floatingPassword"
                                       placeholder="Description"
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Description</label>
                            </div>

                            <div>
                                <Select options={options} className={"mt-3 mb-3"} placeholder={"Select difficult"}
                                        value={difficult}
                                        onChange={(e) => setDifficult(e.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02"
                                       onChange={(e) => handleUploadImage(e)}/>
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </fieldset>

                    </form>

                </div>

                <div className={"list-detail"}>
                    table
                </div>
            </div>
        </>
    )
}