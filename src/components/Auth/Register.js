import {useState} from "react";
import {validateEmail} from "../../utils/ValidateEmail";
import {useNavigate} from "react-router-dom";
import {register} from "../../services/api/ApiService";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import {BiHide, BiShow} from "react-icons/bi";
import './Register.scss';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [validated, setValidated] = useState(false);
    const [isToggle, setIsToggle] = useState(true);

    const validateUsername = (value) => {
        if (value === '') {
            setUserNameError('Please enter a valid username. It contains only letters, numbers, and underscores.');
            return false;
        }
        setUserNameError('');
        return true;
    }

    const validEmail = (value) => {
        if (value === '' && !validateEmail(value)) {
            setEmailError('Please enter a valid username. It contains only letters, numbers, and underscores.');
            return false;
        }
        setEmailError('');
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

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        const isValidUsername = validateUsername(username);
        const isValidPassword = validatePassword(password);
        const isValidEmail = validEmail(email);

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setValidated(true);

        if (isValidEmail && isValidUsername && isValidPassword) {
            let data = {email, username, password};
            let response = await register(data);
            // console.log("response : ", response)
            if (response && response.EC == 0) {
                toast.success('Register successfully');
                navigateLogin();
            } else {
                toast.error(response.EM);
            }
        }

    }

    const navigate = useNavigate();

    const navigateLogin = () => {
        console.log("navigate to login")
        navigate('/login');
    }

    const navigateToHome = () => {
        navigate('/');
    }


    return (
        <div className={"register-container"}>
            <div className={"header"}>
                <span>Already have an account?</span>
                <button className={"btn btn-dark mx-3"} onClick={navigateLogin}>Login</button>
            </div>

            <div className={"title col-4 mx-auto"}>
                Duy Chiến
            </div>

            <div className={"welcome col-4 mx-auto"}>
                Get better data with conversational forms, surveys, quizzes & more.
            </div>

            <div className={"content-form col-4 mx-auto"}>
                <Form className="row g-3 needs-validation" validated={validated}>
                    <Form.Group>
                        <Form.Label>Username (*)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                aria-describedby="inputGroupPrepend"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {userNameError ? userNameError : 'Please choose a username.'}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email (*)</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                autoComplete={"email"}
                                aria-describedby="inputGroupPrepend" required
                                placeholder="benphamdev@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError ? emailError : 'Please choose a email.'}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className={"password-group"}>
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type={isToggle ? 'text' : 'password'}
                                id="validationCustom02" required
                                aria-describedby="validationTooltipPasswordPrepend"
                                autoComplete={"current-password"}
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}
                            />
                            {
                                isToggle
                                    ? <span className={"icons-eye"}
                                            onClick={() => setIsToggle(!isToggle)}><BiHide/></span>
                                    : <span className={"icons-eye"}
                                            onClick={() => setIsToggle(!isToggle)}><BiShow/></span>
                            }
                            <Form.Control.Feedback type="invalid">
                                {passwordError ? passwordError : 'Please choose a password.'}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="I agree to ChienCompany’s Terms of Service, Privacy Policy and Data Processing Agreement."
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>

                </Form>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Signup</button>
                </div>
                <div className={"back-home"}>
                    <span onClick={navigateToHome}> &#60;&#60; &#160; Go to back home</span>
                </div>

            </div>
        </div>
    );
}