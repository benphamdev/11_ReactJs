import { Component } from "react";

export default class DisplayInfo extends Component {
    state = {
        flag: true,
    };

    handleToggle = () => {
        this.setState({
            flag: !this.state.flag,
        });
    };

    render() {
        // props => properties
        // console.log(this.props);
        // destructuring array

        // let { name, age } = this.props;
        // return (
        //     <div>
        //         My name is : {name}
        //         <br />
        //         My age : {age}
        //     </div>
        // );

        // destructuring object
        let { listUsers } = this.props;
        return (
            <div>
                <div>
                    <span onClick={() => this.handleToggle()}>
                        {this.state.flag ? "Hide" : "Show"} list user :
                    </span>
                </div>
                {/* // conditional rendering */}
                {this.state.flag && (
                    <div>
                        {listUsers.map((user, index) => {
                            return (
                                <div className={user.age < 30 ? "red" : "green"} key={user.id}>
                                    <p>ID : {user.id}</p>
                                    <p>Name : {user.name}</p>
                                    <p>Address : {user.address}</p>
                                    <p>Age : {user.age}</p>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}
