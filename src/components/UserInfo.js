// class component
// function component

import {useState} from "react";
import genId from "../utils/generateId.js";

const UserInfo = (props) => {
    const [userInfo, setUserInfo] = useState({
        id: genId(10),
        name: "",
        address: "",
        age: Math.floor(Math.random() * (100 - 10 + 1) + 10),
    });

    let handleOnChange = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value,});
    };

    let handleOnSubmit = (event) => {
        event.preventDefault();
        setUserInfo({...userInfo, id: genId(10),});
        props.handleAddUser(userInfo);
    };

    return (
        <div>
            My name is {userInfo.name} and i from {userInfo.address}

            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label htmlFor="">Your name : </label>

                <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={(event) => handleOnChange(event)}
                />

                <br/>

                <label htmlFor="">Your age : </label>
                <input
                    type="text"
                    name="age"
                    value={userInfo.age}
                    onChange={(event) => handleOnChange(event)}
                />

                <br/>
                <label htmlFor="">Your address : </label>
                <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={(event) => handleOnChange(event)}
                />

                <br/>
                <button>Submit</button>
            </form>
            <br/>
            <br/>
            {/* <DisplayInfo name={userInfo.name} age={userInfo.age} arr={arr} />; */}
        </div>
    );
}

export default UserInfo;
