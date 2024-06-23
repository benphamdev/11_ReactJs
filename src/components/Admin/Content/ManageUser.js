import ModalUser from "./ModalUser";

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>
            <div className="users-content">
                <div>
                    <ModalUser/>
                </div>
                <div>
                    table goes here
                </div>
            </div>
        </div>
    );
};

export default ManageUser;