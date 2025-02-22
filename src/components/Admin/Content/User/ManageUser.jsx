import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { getParticipants, getParticipantsWithPagination } from "../../../../services/api/ParticipantService";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUser from "./ModalUser";
import './ManageUser.scss';
import TableUser from "./TableUser";

const ManageUser = (props) => {
    // props

    // state
    const [show, setShow] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [users, setUsers] = useState([])
    const [infoUser, setInfoUser] = useState(null);
    const [infoDeleteUser, setInfoDeleteUser] = useState(null);
    const [isView, setIsView] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(5);

    // constants
    const LIMIT_PAGE_LIMIT = [5, 10, 15];

    useEffect(() => {
        // console.log("ManageUser.jsx useEffect")
        fetchUsersWithPagination(currentPage);
    }, [limitPerPage]);

    const fetchUsers = async () => {
        let res = await getParticipants();
        // console.log("ManageUsers list users : ", res);
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    }

    const fetchUsersWithPagination = async (page) => {
        let res = await getParticipantsWithPagination(page, limitPerPage);
        console.log("ManageUsers list users : ", res);
        if (res.EC === 0) {
            setUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
            console.log("pageCount : ", page)
            // when set current page , it will render TableUser component
            // if set current page user live in current page, user will be page 1
            // because force page attribute in TableUser component
            // setCurrentPage(page);
        }
    }

    const showInfo = (user) => {
        setShow(true);
        setInfoUser(user);
    }

    const handleBtnUpdate = (user) => {
        showInfo(user)
    }

    const handleBtnView = (user) => {
        showInfo(user)
        setIsView(true)
    }

    const handelBtnDelete = (user) => {
        setShowDeleteUser(true)
        setInfoDeleteUser(user)
    }

    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>

            <div className="users-content">

                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => {
                        setShow(true)
                        setInfoUser(null)
                    }}>
                        Add new user
                    </button>
                </div>

                <div className="table-users-container">
                    <TableUser
                        users={users}
                        handleBtnUpdate={handleBtnUpdate}
                        handleBtnView={handleBtnView}
                        handelBtnDelete={handelBtnDelete}
                        fetchUsersWithPagination={fetchUsersWithPagination}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        limitPerPage={limitPerPage}
                        setLimitPerPage={setLimitPerPage}
                    />
                </div>

                <ModalUser
                    show={show} setShow={setShow}
                    fetchUsersWithPagination={fetchUsersWithPagination}
                    infoUser={infoUser} setInfoUser={setInfoUser}
                    isView={isView} setIsView={setIsView}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalDeleteUser
                    show={showDeleteUser} setShow={setShowDeleteUser}
                    fetchUsersWithPagination={fetchUsersWithPagination}
                    infoDeleteUser={infoDeleteUser} setInfoDeleteUser={setInfoDeleteUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />


            </div>

        </div>
    );
};

export default ManageUser;