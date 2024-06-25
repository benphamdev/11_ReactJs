import './Login.scss'
import {useState} from "react";
import {validateEmail} from "../../utils/ValidateEmail";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateUsername = (value) => {
        if (value === '' && !validateEmail(value)) {
            setUserNameError('Please enter a valid username. It contains only letters, numbers, and underscores.');
            return false;
        }
        setUserNameError('');
        return true;
    }

    const validatePassword = (value) => {
        if (value === '') {
            setPasswordError('Password is required. It contains only letters, numbers, and underscores.');
            return false;
        }
        setPasswordError('');
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValidUsername = validateUsername(username);
        const isValidPassword = validatePassword(password);
        if (isValidUsername && isValidPassword) {
            alert('Login success');
        }
    }

    return (
        <div className={"login-container"}>

            <div className={"header"}>
                Don't have an account yet? Sign up Contact us
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
                                id="validationTooltipUsername"
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

                </form>

                <span>Forgot password?</span>

                <div className="col-12">
                    <button
                        className="btn btn-primary" type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}