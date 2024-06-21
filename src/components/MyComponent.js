// class component
// function component

import {useState} from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

export default function MyComponent() {
    const [listUsers, setListUser] = useState([
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
            }
        ]
    );

    const handleAddUser = (userObj) => {
        setListUser([userObj, ...listUsers]);
    };

    const handleDeleteUser = (userId) => {
        setListUser(listUsers.filter((user) => user.id !== userId));

        // setListUser(() => {
        //     return listUsers.filter((user) => user.id !== userId)
        // });
    };

    return (
        <>
            <UserInfo handleAddUser={handleAddUser}/>
            <br/>
            <br/>
            <DisplayInfo
                listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    );
}
