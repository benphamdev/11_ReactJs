// class component
// function component

import {Component} from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

class MyComponent extends Component {
    state = {
        listUsers: [
            {
                id: 1,
                name: "bendev",
                address: "thai binh",
                age: 35,
            },
            {
                id: 2,
                name: "pham duy chien",
                address: "thai binh",
                age: 22,
            },
            {
                id: 3,
                name: "duy chien",
                address: "thai binh",
                age: 23,
            },
        ],
    };

    // jsx
    render() {
        // const test = {
        //     name: "chien",
        //     age: 21,
        // };
        return (
            <>
                {/* {JSON.stringify(test)}   */}
                {/* note : boolean not render  */}
                <UserInfo handleAddUser={this.handleAddUser}/>
                <br/>
                <br/>
                <DisplayInfo
                    listUsers={this.state.listUsers}
                    handleDeleteUser={this.handleDeleteUser}
                />
            </>
        );
    }

    handleAddUser = (userObj) => {
        // console.log(userObj);
        this.setState({
            // add front
            listUsers: [userObj, ...this.state.listUsers],
            // add back
            // listUsers: [userObj, ...this.state.listUsers],
        });
    };

    handleDeleteUser = (userId) => {
        this.setState({
            listUsers: this.state.listUsers.filter((user) => user.id !== userId),
        });
    };

}

export default MyComponent;
