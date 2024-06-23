import ModalUser from "./ModalUser";
import './ManageUser.scss';

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>
            <div className="users-content">
                <div>

                </div>
                <div>
                    table goes here
                </div>
                <ModalUser/>
            </div>
        </div>
    );
};

export default ManageUser;