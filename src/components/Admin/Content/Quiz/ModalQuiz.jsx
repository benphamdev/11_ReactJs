import {useEffect, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import {updateQuiz} from "../../../../services/api/QuizService";

function ModalQuiz(props) {
    // props
    const {
        show, setShow, getAllQuiz,
        quiz, setQuiz,
        isView, setIsView
    } = props;

    const options = [
        {value: 'EASY', label: 'EASY'},
        {value: 'MEDIUM', label: 'MEDIUM'},
        {value: 'HARD', label: 'HARD'}
    ]
    // state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("Modal useEffect Quiz: ", quiz);
        if (quiz !== null) {
            setName(quiz?.name || '');
            setDescription(quiz?.description || '');
            setDifficulty(quiz?.difficulty || 'USER');
            if (quiz?.image)
                setPreviewImage(`data:image/svg+xml+jpeg+png;base64,${quiz.image}`);
        }
    }, [props.quiz]);

    const handleClose = () => {
        setShow(false)
        setDescription('')
        setName('')
        setDifficulty('EASY')
        setImage('')
        setPreviewImage('')
        setQuiz(null);
        setIsView(false)
        // inputRef.current.value = null;
    };

    const handleSave = async () => {
        // validate
        if (!name || !description) {
            toast.error("All fields are required")
            return;
        }
        let data, response;
        try {
            data = {id: quiz.id, name: name, description: description, difficulty: difficulty, quizImage: image}
            response = await updateQuiz(data);

            if (response && response.EC === 0) {
                toast.success('Update quiz successfully')
                // console.log("current page : ", props.currentPage)
                await getAllQuiz();
            } else {
                toast.error(response.EM);
            }
            handleClose()
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleUploadImage = (event) => {
        if (event) {
            setPreviewImage((URL.createObjectURL(event.target.files[0])));
            setImage(event.target.files[0]);
        }
    }

    console.log("render modalquiz", quiz);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={"xl"}
                className={"modal-quiz"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {!isView ? "Update" : "View"} quiz
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3 needs-validation">
                        <div className="col-md-6">
                            <label htmlFor="validationCustomName" className="form-label">description</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomName"
                                       aria-describedby="inputGroupPrepend" required
                                       disabled={isView} placeholder="description" value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="invalid-tooltip">
                                    Please choose a description.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="validationCustom01" className="form-label">name</label>
                            <input type="text" className="form-control" id="validationCustom01" required
                                   autoComplete={"name"} disabled={isView} placeholder="benphamdev" value={name}
                                   onChange={(e) => setName(e.target.value)}
                            />
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="validationCustom04" className="form-label">difficulty</label>
                            <select className="form-select" id="validationCustom04" required value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    disabled={isView}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                            <div className="invalid-tooltip">
                                Please select a valid difficulty.
                            </div>
                        </div>

                        {
                            !isView && <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02"
                                       ref={inputRef}
                                       onChange={(e) => handleUploadImage(e)}/>
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        }

                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage}/> : <span>Preview Image</span>}
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {!isView && <Button variant="primary" onClick={handleSave}>Save</Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalQuiz;