import {Route, Routes} from "react-router-dom";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import {Login} from "./components/Auth/Login";
import React from "react";
import {ToastContainer} from "react-toastify";

export const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/users/*" element={<User/>}/>
                </Route>

                <Route path="/admins/" element={<Admin/>}>
                    <Route index element={<DashBoard/>}/>
                    <Route path="manage-users" element={<ManageUser/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    )
}