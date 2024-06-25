import './Login.scss'
import {useState} from "react";
import {validateEmail} from "../../utils/ValidateEmail";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/api/ApiService";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {doLogin} from "../../redux/action/UserAction";
import {ImSpinner8} from "react-icons/im";

export const Login = () => {
    // state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);
    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateUsername = (value) => {
        if (value === '' || !validateEmail(value)) {
            setUserNameError('Please enter a valid username. It contains only letters, numbers, and underscores.');
            return false;
        }
        setUserNameError('');
        return true;
    }

    const validatePassword = (value) => {
        if (value === '') {
            setPasswordError('It contains only letters, numbers, and underscores.');
            return false;
        }
        setPasswordError('');
        return true;
    }

    // if use useEffect to able button login when username and password is valid, but i can solve it
    // when conflict icon loading . i will solve it later
    // useEffect(() => {
    //     setIsValid(!validateUsername(username) || !validatePassword(password));
    // });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValidUsername = validateUsername(username);
        const isValidPassword = validatePassword(password);

        if (isValidUsername && isValidPassword) {
            setIsValid(true)
            let data = {email: username, password, delay: 5000};
            let response = await login(data);
            console.log("response : ", response)

            if (response && response.EC == 0) {
                toast.success('Login successfully');
                // navigateToHome();
                dispatch(doLogin(response.DT));
            } else {
                toast.error(response.EM);
            }
            setIsValid(false)
        }
    }

    const navigateToHome = () => {
        navigate('/');
    }

    const navigateToRegister = () => {
        navigate('/register')
    }

    return (
        <div className={"login-container"}>

            <div className={"header"}>
                <span>Don't have an account yet?</span>
                <button className={"btn btn-dark mx-3"} onClick={navigateToRegister}>Sign up</button>
                <span>Contact us</span>
            </div>

            <div className={"title col-4 mx-auto"}>
                Duy Chiến
            </div>

            <div className={"welcome col-4 mx-auto"}>
                Hello, who’s this?
            </div>

            <div className={"content-form col-4 mx-auto"}>
                <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                    <div className="form-group">
                        <label htmlFor="validationTooltipUsername" className="form-label">
                            <b>Username</b>
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="email" className={`form-control ${userNameError ? 'is-invalid' : ''}`}
                                id="validationTooltipUsername" autoComplete={"username"}
                                aria-describedby="validationTooltipUsernamePrepend" required
                                value={username}
                                placeholder={"phamchien@gmail.com"}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={validateUsername}
                            />

                            <div className="invalid-tooltip">
                                {userNameError}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="validationCustom02" className="form-label">
                            <b>Password</b>
                        </label>
                        <div className="input-group has-validation">
                            <input
                                type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                id="validationCustom02" required
                                aria-describedby="validationTooltipPasswordPrepend"
                                autoComplete={"current-password"}
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}
                            />

                            <div className="invalid-tooltip">
                                {passwordError}
                            </div>
                        </div>
                    </div>
                </form>

                <span>Forgot password?</span>

                <div className="col-12">
                    <button
                        className="btn btn-primary btn-login" type="submit"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isValid}
                    >
                        {
                            isValid
                                ? <div>
                                    <ImSpinner8 className={"loader-icon"}/>
                                    <a>Loading</a>
                                </div>
                                : <a>Login</a>
                        }
                    </button>
                </div>

                <div className={"back-home"}>
                    <span onClick={navigateToHome}> &#60;&#60; &#160; Go to back home</span>
                </div>
            </div>
        </div>
    );
}