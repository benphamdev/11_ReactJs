// class component
// function component

import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "bendev",
        address: "thai binh",
        age: 21,
    };

    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name} and i from {this.state.address}
            </div>
        );
    }
}

export default MyComponent;
