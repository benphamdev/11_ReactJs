import ModalUser from "./ModalUser";
import './ManageUser.scss';
import {useEffect, useState} from "react";
import TableUser from "./TableUser";
import {getParticipants} from "../../../services/api/apiService";


const ManageUser = (props) => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([])
    const [infoUpdateUser, setInfoUpdateUser] = useState(null);
    const [isView, setIsView] = useState(false);

    useEffect(() => {
        // console.log("ManageUser.js useEffect")
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        let res = await getParticipants();
        // console.log("ManageUsers list users : ", res);
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    }

    const showInfo = (user) => {
        setShow(true);
        setInfoUpdateUser(user);
    }
    const handleBtnUpdate = (user) => {
        showInfo(user)
    }

    const handleBtnView = (user) => {
        showInfo(user)
        setIsView(true)
    }


    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>

            <div className="users-content">

                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => {
                        setShow(true)
                        setInfoUpdateUser(null)
                    }}>
                        Add new user
                    </button>
                </div>

                <div className="table-users-container">
                    <TableUser users={users} handleBtnUpdate={handleBtnUpdate}
                               handleBtnView={handleBtnView}
                    />
                </div>

                <ModalUser show={show} setShow={setShow} fetchUsers={fetchUsers}
                           infoUpdateUser={infoUpdateUser} setInfoUpdateUser={setInfoUpdateUser}
                           isView={isView} setIsView={setIsView}
                />

            </div>

        </div>
    );
};

export default ManageUser;