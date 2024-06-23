import ModalUser from "./ModalUser";
import './ManageUser.scss';
import {useState} from "react";

const ManageUser = (props) => {
    const [show, setShow] = useState(false);

    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>
            <div className="users-content">
                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => setShow(true)}>Add new user</button>
                </div>
                <div className="table-users-container">
                    table goes here
                </div>
                <ModalUser show={show} setShow={setShow}/>
            </div>
        </div>
    );
};

export default ManageUser;