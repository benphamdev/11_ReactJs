import Table from 'react-bootstrap/Table';

const TableUser = (props) => {
    const {users, handleBtnUpdate} = props;

    return (
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
                            <td className={"col-1"}>{user.username}</td>
                            <td className={"col-2"}>{user.email}</td>
                            <td className={"col-1"}>{user.role}</td>
                            <td className={"col-2"}>
                                <button className={"btn btn-secondary"}>View</button>
                                <button className={"btn btn-warning mx-3"}
                                        onClick={() => handleBtnUpdate(user)}
                                >
                                    Update
                                </button>
                                <button className={"btn btn-danger"}>Delete</button>
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
    );

}
export default TableUser;