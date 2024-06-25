import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from "../../../services/api/ApiService";
import {toast} from "react-toastify";

function ModalDeleteUser(props) {
    const {show, setShow, fetchUsersWithPagination, infoDeleteUser, setInfoDeleteUser} = props;

    const handleClose = () => {
        setShow(false)
        setInfoDeleteUser(null)
    }

    const handleConfirm = async () => {
        let data = {id: infoDeleteUser.id};
        try {
            let response = await deleteUser(data);
            if (response.EC == 0) {
                toast.success(`Delete user has user id ${infoDeleteUser.id} successfully`)
                handleClose()
                props.setCurrentPage(1);
                await fetchUsersWithPagination(props.currentPage);
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
                        Delete user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete this user . Email
                    <b> {infoDeleteUser ? infoDeleteUser.email : ""}< /b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;