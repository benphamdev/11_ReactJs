// class component
// function component

import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";
import { Component } from "react";

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
        return (
            <div>
                <UserInfo handleAddUser={this.handleAddUser} />
                <br />
                <br />
                <DisplayInfo listUsers={this.state.listUsers} />
            </div>
        );
    }

    handleAddUser = (userObj) => {
        // console.log(userObj);
        this.setState({
            listUsers: [userObj, ...this.state.listUsers],
        });
    };
}

export default MyComponent;
