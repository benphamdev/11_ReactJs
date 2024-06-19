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
            age: Math.floor(Math.random() * (100 - 10 + 1) + 10)
        });


        // react class => merge state 
        this.setState({
            address: Math.floor(Math.random() * (100 - 10 + 1) + 10),
        });
    }
    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name} and i from {this.state.address}
                <button onClick={this.handleClick}>On click</button>
                <button
                    onMouseOver={(event) => {
                        this.handleMouseOver(event);
                    }}
                >
                    Mouse over
                </button>
            </div>
        );
    }
}

export default MyComponent;
