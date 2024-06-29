import 'react-pro-sidebar/dist/css/styles.css';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu,} from 'react-pro-sidebar';

import {FaGem, FaGithub, FaTachometerAlt} from 'react-icons/fa';
import sidebarBg from '../../assets/img/bg2.jpg';
import {FaReact} from "react-icons/fa6";
import "./SideBar.scss"
import {Link, useNavigate} from "react-router-dom";

const SideBar = (props) => {
    const {image, collapsed, toggled, handleToggleSidebar} = props;
    const navigate = useNavigate();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => navigate('/')}
                    >
                        <FaReact size={"2em"} color={"#1360cd"} style={{marginRight: '12px'}}/>
                        React Admin
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt/>}
                            suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to="/admins"/>
                        </MenuItem>

                        <SubMenu
                            title="Features"
                            icon={<FaGem/>}
                            suffix={<span className="badge yellow">3</span>}
                        >
                            <MenuItem>Manage Users
                                <Link to="/admins/manage-users"/>
                            </MenuItem>

                            <MenuItem>Manage Quizzes
                                <Link to="/admins/manage-quizzes"/>
                            </MenuItem>

                            <MenuItem>Manage Questions
                                <Link to="/admins/questions"/>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{textAlign: 'center'}}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/benphamdev"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub/>
                            <span style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                ViewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;