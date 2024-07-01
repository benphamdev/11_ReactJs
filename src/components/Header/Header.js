import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {NavDropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import {doLogout} from "../../redux/action/UserAction";
import {logout} from "../../services/api/AuthService";
import {Language} from "./Language";

function Header() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    const account = useSelector((state) => state.userReducer.account);
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogout = async () => {
        let response = await logout(account.email, account.refresh_token);
        if (response && response.EC === 0) {
            // clear data redux
            dispatch(doLogout());
            toast.success(response.EM);
            navigate("/login");
        } else {
            toast.error(response.EM);
        }

    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/*<Navbar.Brand href="#home">Ben Pham</Navbar.Brand>*/}
                <NavLink to={"/"} className="navbar-brand">Ben Pham</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={"/"} className={"nav-link"}>Home</NavLink>
                        <NavLink to={"/users"} className={"nav-link"}>User</NavLink>
                        <NavLink to={"/admins"} className={"nav-link"}>Admin</NavLink>
                        {/*<Nav.Link href="/">Home</Nav.Link>*/}
                        {/*<Nav.Link href="/users">User</Nav.Link>*/}
                        {/*<Nav.Link href="/admins">Admin</Nav.Link>*/}
                    </Nav>

                    <Nav>
                        {
                            !isAuthenticated
                                ? <>
                                    <button className="btn-login" onClick={() => handleLogin()}> Login</button>
                                    <button className="btn-signup" onClick={handleRegister}> Signup</button>
                                </>
                                : <NavDropdown title="Settings" id="basic-nav-setting">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item>Login</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                        }
                        <Language/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;