// class component
// function component

import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "bendev",
        address: "thai binh",
        age: 21,
    };

    handleClick() {
        console.log("hello world");
    }

    handleMouseOver(event) {
        // console.log(event.pageX);
        //https:bobbyhadz.com/blog/react-typeerror-cannot-read-property-setstate-of-undefined
        console.log("My name is", this.state.name, " and i from ", this.state.age);

        this.setState({
            name: "pham duy chien",
            age: Math.floor(Math.random() * (100 - 10 + 1) + 10),
        });

        // react class => merge state
        this.setState({
            address: Math.floor(Math.random() * (100 - 10 + 1) + 10),
        });
    }

    handleOnChange = (event) => {
        this.setState({
            name: event.target.value,
        });
        console.log(event, event.target.value);
    };

    handleOnSubmit = (event) => {
        event.preventDefault(); // default có sẵn ngăn được alert ko ngăn được console.log
        // alert("oke");
        console.log(this.state);
    };

    // jsx
    render() {
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
                    <input type="text" onChange={(event) => this.handleOnChange(event)} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;
