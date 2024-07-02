import {useState} from "react";
import './Admin.scss'
import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Language} from "../Header/Language";
import SideBar from "./SideBar";
import {FaBars} from "react-icons/fa";
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {
    // hook
    const {t, i18n} = useTranslation();
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
                        <NavDropdown title={t('header.settings')} id="basic-nav-setting">
                            <NavDropdown.Item>{t('header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item>{t('header.login')}</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => handleLogout()}>
                                {t('header.logout')}
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