import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from "react-toastify";
import {deleteQuizById} from "../../../../services/api/QuizService";

function ModalDeleteQuiz(props) {
    const {show, setShow, getAllQuiz, quiz, setQuiz} = props;

    const handleClose = () => {
        setShow(false)
        // setQuiz(null);
    }

    const handleConfirm = async () => {
        let data = +quiz.id;
        try {
            let response = await deleteQuizById(data);
            if (response && response.EC == 0) {
                toast.success(`Delete user has user id ${quiz.id} successfully`)
                handleClose()
                await getAllQuiz();
            } else {
                toast.error(response.EM);
                handleClose();
            }
        } catch (e) {
            console.log("error : ", e);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete quizz
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete this user . Id
                    <b> {quiz ? quiz.id : ""}< /b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;