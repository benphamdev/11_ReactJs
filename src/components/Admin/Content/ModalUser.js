import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUploadImage = (event) => {
        if (event) {
            setPreviewImage((URL.createObjectURL(event.target.files[0])));
            setAvatar(event.target.files[0]);
        }
    }

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [avatar, setAvatar] = useState('');
    const [previewImage, setPreviewImage] = useState('');


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
                className={"modal-user"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<FormExample/>*/}

                    <form className="row g-3 needs-validation">

                        <div className="col-md-6">
                            <label htmlFor="validationCustom01" className="form-label">Username</label>
                            <input type="text" className="form-control" id="validationCustom01" required
                                   placeholder="benphamdev" value={username}
                                   onChange={(e) => setUserName(e.target.value)}
                            />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="validationCustom02" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustom02" required
                                   placeholder="1234556789" value={password}
                                   onChange={(e) => setPassword(e.target.value)}

                            />
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
                                       placeholder="benphamdev@gmail.com" value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="invalid-feedback">
                                    Please choose a email.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="validationCustom04" className="form-label">Role</label>
                            <select className="form-select" id="validationCustom04" required
                                    onChange={(e) => setRole(e.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid state.
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile02"
                                   onChange={(e) => handleUploadImage(e)}/>
                            <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage}/> : <span>Preview Image</span>}
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