import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import {useSelector} from "react-redux";
import {History} from "./History";
import InfoUser from "./InfoUser";
import {Password} from "./Password";

export const Profile = (props) => {
    const {show, setShow} = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    const account = useSelector((state) => state.userReducer.account);

    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen={'xxl-down'}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Tabs
                        defaultActiveKey="Info"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="Info" title="Info">
                            <InfoUser/>
                        </Tab>

                        <Tab eventKey="Password" title="Password">
                            <Password/>
                        </Tab>

                        <Tab eventKey="history" title="History">
                            <History/>
                        </Tab>
                    </Tabs>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}