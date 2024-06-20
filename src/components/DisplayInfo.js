import { Component } from "react";
import logo from "./../logo.svg";
import "./DisplayInfo.scss";

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
            <div className="display-info-container">
                <img src={logo} alt="" />
                <div>
                    <span onClick={() => this.handleToggle()}>
                        {this.state.flag ? "Hide" : "Show"} list user :
                    </span>
                </div>
                {/* // conditional rendering */}
                {/* note : boolean not render  */}
                {this.state.flag && (
                    <>
                        {listUsers.map((user, index) => {
                            return (
                                <div className={user.age < 30 ? "red" : "green"} key={user.id}>
                                    <div style={{ color: "purple", paddingTop: "5px" }}>ID : {user.id}</div>
                                    <p>Name : {user.name}</p>
                                    <p>Address : {user.address}</p>
                                    <p>Age : {user.age}</p>
                                    <hr />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        );
    }
}
