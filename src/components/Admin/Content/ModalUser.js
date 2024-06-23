import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={"xl"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<FormExample/>*/}

                    <form class="row g-3 needs-validation" novalidate>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom01" className="form-label">Username</label>
                            <input type="text" className="form-control" id="validationCustom01" required
                                   placeholder="benphamdev"/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom02" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustom02" required
                                   placeholder="1234556789"/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername"
                                       aria-describedby="inputGroupPrepend" required
                                       placeholder="benphamdev@gmail.com"/>
                                <div className="invalid-feedback">
                                    Please choose a email.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="validationCustom04" className="form-label">Role</label>
                            <select className="form-select" id="validationCustom04" required>
                                <option selected value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid state.
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile02"/>
                            <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                        </div>

                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck"
                                       required/>
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Submit form</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}

export default ModalUser;