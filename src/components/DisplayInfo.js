import "./DisplayInfo.scss";
import logo from "./../logo.svg";
import {useState} from "react";

export default function DisplayInfo(props) {
    // destructuring object
    const {listUsers} = props;

    //destructuring assignment
    const [isToggle, set] = useState(true);

    const handleToggle = () => {
        set(!isToggle);
    };

    return (
        <div className="display-info-container">
            <img src={logo} alt=""/>
            <div>
                 <span onClick={() => handleToggle()}>
                    {isToggle ? "Hide" : "Show"} list user :
				</span>
            </div>
            
            {(isToggle &&
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
