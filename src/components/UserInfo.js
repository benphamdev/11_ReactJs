// class component
// function component

import { Component } from "react";
import genId from "../utils/generateId.js";

class UserInfo extends Component {
    state = {
        id: genId(10),
        name: "",
        address: "",
        age: Math.floor(Math.random() * (100 - 10 + 1) + 10),
    };

    // jsx
    render() {
        let myAge = 26,
            arr = ["pham", "chien"];
        return (
            <div>
                My name is {this.state.name} and i from {this.state.address}
                {/* <button onClick={this.handleClick}>On click</button> */}
                {/* <button
                    onMouseOver={(event) => {
                        this.handleMouseOver(event);
                    }}
                >
                    Mouse over
                </button> */}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label htmlFor="">Your name : </label>

                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(event) => this.handleOnChange(event)}
                    />

                    <br />

                    <label htmlFor="">Your age : </label>
                    <input
                        type="text"
                        name="age"
                        value={this.state.age}
                        onChange={(event) => this.handleOnChange(event)}
                    />

                    <br />
                    <label htmlFor="">Your address : </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={(event) => this.handleOnChange(event)}
                    />

                    <br />
                    <button>Submit</button>
                </form>
                <br />
                <br />
                {/* <DisplayInfo name={this.state.name} age={this.state.age} arr={arr} />; */}
            </div>
        );
    }

    handleClick() {
        console.log("hello world");
    }

    handleMouseOver(event) {
        // event of web api
        // console.log(event.pageX);
        //https:bobbyhadz.com/blog/react-typeerror-cannot-read-property-setstate-of-undefined
        console.log("My name is", this.state.name, " and i from ", this.state.age);

        this.setState({
            name: "pham duy chien",
            age: Math.floor(Math.random() * (100 - 10 + 1) + 10),
        });

        // react class => merge state
        this.setState({
            address: "Thai Binh",
        });
    }

    handleOnChange = (event) => {
        // bad code
        // this.setState.event = event.target.value

        // good code
        this.setState({
            [event.target.name]: event.target.value,
        });

        // console.log(event, event.target.value);
    };

    handleOnSubmit = (event) => {
        event.preventDefault(); // default có sẵn ngăn được alert ko ngăn được console.log
        // alert("oke");

        // generate id => don't correct because it's operation async
        this.setState({
            id: genId(10),
        });

        // call function from parent
        this.props.handleAddUser(this.state);
    };
}

export default UserInfo;
