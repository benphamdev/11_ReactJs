import {useEffect, useState} from "react";
import {ImSpinner8} from "react-icons/im";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {doLogin} from "../../redux/action/UserAction";
import {login} from "../../services/api/AuthService";
import "./Login.scss";
import {validateEmail} from "../../utils/Utils";
import {Language} from "../Header/Language";

export const Login = () => {
    // state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isValid, setIsValid] = useState(false);

    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateUsername = (value) => {
        if (value === null || !validateEmail(value)) {
            setUserNameError(
                "Please enter a valid username. It contains only letters, numbers, and underscores.",
            );
            return false;
        }
        setUserNameError("");
        return true;
    };

    const validatePassword = (value) => {
        if (value.length === 0) {
            // || !validatePass(value)
            setPasswordError(
                "Please enter a valid password. " +
                "It contains at least 8 characters, 1 letter, 1 number, and 1 special character.",
            );
            return false;
        }
        setPasswordError("");
        return true;
    };

    // if use useEffect to able button login when username and password is valid, but i can solve it
    // when conflict icon loading . i will solve it later
    useEffect(() => {
        validateEmail(username);
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValidUsername = validateUsername(username);
        const isValidPassword = validatePassword(password);

        if (isValidUsername && isValidPassword) {
            setIsValid(true);
            const data = {email: username, password, delay: 2000};
            const response = await login(data);
            console.log("response : ", response);

            if (response && response.EC == 0) {
                toast.success("Login successfully");
                dispatch(doLogin(response.DT));
                navigateToHome();
            } else {
                toast.error(response.EM);
            }
            setIsValid(false);
        }
    };

    const navigateToHome = () => {
        navigate("/");
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };
    return (
        <div className={"login-container"}>
            <div className={"header"}>
                <span>Don't have an account yet?</span>
                <button className={"btn btn-dark mx-3"} onClick={navigateToRegister}>
                    Sign up
                </button>
                <span>Contact us</span>
                <Language/>
            </div>

            <div className={"title col-4 mx-auto"}>Duy Chiến</div>

            <div className={"welcome col-4 mx-auto"}>Hello, who’s this?</div>

            <div className={"content-form col-4 mx-auto"}>
                <form
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                    onKeyDown={(e) => {
                        handleKeyDown(e)
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="validationTooltipUsername" className="form-label">
                            <b>Username</b>
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="email"
                                className={`form-control ${userNameError ? "is-invalid" : ""}`}
                                id="validationTooltipUsername"
                                autoComplete={"username"}
                                aria-describedby="validationTooltipUsernamePrepend"
                                required
                                value={username}
                                placeholder={"phamchien@gmail.com"}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    validateUsername(e.target.value);
                                }}
                                onBlur={() => {
                                    // if (username && !validateEmail(username)) {
                                    validateUsername(username);
                                    // }
                                }}
                            />
                            <div className="invalid-tooltip">{userNameError}</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="validationCustom02" className="form-label">
                            <b>Password</b>
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="password"
                                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                                id="validationCustom02"
                                required
                                aria-describedby="validationTooltipPasswordPrepend"
                                autoComplete={"current-password"}
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                onBlur={() => {
                                    validatePassword(password);
                                }}

                            />

                            <div className="invalid-tooltip">{passwordError}</div>
                        </div>
                    </div>
                </form>

                <span>Forgot password?</span>

                <div className="col-12">
                    <button
                        className="btn btn-primary btn-login"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isValid}
                    >
                        {isValid ? (
                            <div>
                                <ImSpinner8 className={"loader-icon"}/>
                                <a>Loading</a>
                            </div>
                        ) : (<a>Login</a>)}
                    </button>
                </div>

                <div className={"back-home"}>
					<span onClick={navigateToHome}>
						{" "}
                        &#60;&#60; &#160; Go to back home
					</span>
                </div>
            </div>
        </div>
    );
};
