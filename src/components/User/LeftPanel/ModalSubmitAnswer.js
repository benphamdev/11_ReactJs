import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalSubmitAnswer = (props) => {
    const {show, setShow, answerQuiz} = props;

    const handleClose = () => {
        setShow(false)
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
                        You are about to submit your answers
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>Total questions : <b>{answerQuiz.countTotal}</b>
                    </div>
                    <div>Total questions : <b>{answerQuiz.countCorrect}</b>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary">Show answer</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSubmitAnswer;