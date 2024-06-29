import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
    const {
        users, handleBtnUpdate, handleBtnView, handelBtnDelete,
        fetchUsersWithPagination, pageCount,
        currentPage, setCurrentPage,
    } = props;
    
    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        setCurrentPage(event.selected + 1);
        fetchUsersWithPagination(event.selected + 1);
    };

    return (<>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>No</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    users && users.length !== 0 && users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td className={"col-1"}>{user.id}</td>
                                <td className={"col-2"}>{user.username}</td>
                                <td className={"col-2"}>{user.email}</td>
                                <td className={"col-1"}>{user.role}</td>
                                <td className={"col-3"}>

                                    <button className={"btn btn-secondary"} onClick={() => handleBtnView(user)}>
                                        View
                                    </button>

                                    <button className={"btn btn-warning mx-3"} onClick={() => handleBtnUpdate(user)}>
                                        Update
                                    </button>

                                    <button className={"btn btn-danger"} onClick={() => handelBtnDelete(user)}>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        )
                    })
                }
                {
                    users && users.length === 0 && <tr>
                        <td colSpan={4}>No data</td>
                    </tr>
                }

                </tbody>
            </Table>

            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination d-flex justify-content-center"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    );
}
export default TableUser;