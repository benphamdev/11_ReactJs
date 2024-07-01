import {useState} from "react";
import './Admin.scss'
import {NavDropdown} from "react-bootstrap";
import {Language} from "../Header/Language";
import SideBar from "./SideBar";
import {FaBars} from "react-icons/fa";
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">

            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <span className={'left-view'}>
                        <FaBars onClick={() => setCollapsed(!collapsed)}/>
                    </span>

                    <div className={'right-view'}>
                        <Language/>
                        <NavDropdown title="Settings" id="basic-nav-setting">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Login</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet/>
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;