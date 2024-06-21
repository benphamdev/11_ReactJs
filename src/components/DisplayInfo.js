import "./DisplayInfo.scss";
import logo from "./../logo.svg";

// stateless vs stateful
// class component
// stateful
// export default class DisplayInfo extends Component {
//     state = {
//         flag: true,
//     };
//
//     // babel compiler
//     constructor(props) {
//         super(props);
//         console.log("constructor")
//         this.state = {
//             flag: true
//         }
//     }
//
//     componentDidMount() {
//         console.log("componentDidMount")
//         setTimeout(() => {
//             document.title = "Display Info";
//         }, 3000);
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         console.log("componentDidUpdate", prevProps, prevState, snapshot);
//
//         if (this.props.listUsers !== prevProps.listUsers) {
//             if (this.props.listUsers.length === 5)
//                 alert("You got 5 users");
//         }
//     }
//
//     handleToggle = () => {
//         this.setState({
//             flag: !this.state.flag,
//         });
//     };
//
//     render() {
//         // props => properties
//         // console.log(this.props);
//         // destructuring array
//
//         // let { name, age } = this.props;
//         // return (
//         //     <div>
//         //         My name is : {name}
//         //         <br />
//         //         My age : {age}
//         //     </div>
//         // );
//
//         console.log("render")
//         // destructuring object
//         const {listUsers} = this.props;
//         return (
//             <div className="display-info-container">
//                 <img src={logo} alt=""/>
//                 <div>
// 					<span onClick={() => this.handleToggle()}>
// 						{this.state.flag ? "Hide" : "Show"} list user :
// 					</span>
//                 </div>
//                 {/* // conditional rendering */}
//                 {/* note : boolean not render  */}
//                 {this.state.flag && (
//                     <>
//                         {listUsers.map((user, index) => {
//                             return (
//                                 <div className={user.age < 30 ? "red" : "green"} key={user.id}>
//                                     <div style={{color: "purple", paddingTop: "5px"}}>
//                                         ID : {user.id}
//                                     </div>
//                                     <p>Name : {user.name}</p>
//                                     <p>Address : {user.address}</p>
//                                     <p>Age : {user.age}</p>
//                                     <br/>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>
//                                             Delete user
//                                         </button>
//                                     </div>
//                                     <hr/>
//                                 </div>
//                             );
//                         })}
//                     </>
//                 )}
//             </div>
//         );
//     }
// }

// stateless
// function component => don't has state
const DisplayInfo = (props) => {
    // destructuring object
    const {listUsers} = props;
    return (
        <div className="display-info-container">
            <img src={logo} alt=""/>

            {/* // conditional rendering */}
            {/* note : boolean not render  */}
            {true && (
                <>
                    {listUsers.map((user, index) => {
                        return (
                            <div className={user.age < 30 ? "red" : "green"} key={user.id}>
                                <div style={{color: "purple", paddingTop: "5px"}}>
                                    ID : {user.id}
                                </div>
                                <p>Name : {user.name}</p>
                                <p>Address : {user.address}</p>
                                <p>Age : {user.age}</p>
                                <br/>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>
                                        Delete user
                                    </button>
                                </div>
                                <hr/>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default DisplayInfo;