import React from "react";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import App from "./App";
import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/Content/DashBoard";
import {Questions} from "./components/Admin/Content/Question/Questions";
import {ManageQuiz} from "./components/Admin/Content/Quiz/ManageQuiz";
import ManageUser from "./components/Admin/Content/User/ManageUser";
import {Login} from "./components/Auth/Login";
import {Register} from "./components/Auth/Register";
import HomePage from "./components/Home/HomePage";
import {PageNotFound} from "./components/PageNotFound";
import {DetailQuiz} from "./components/User/DetailQuiz";
import {Quiz} from "./components/User/Quiz";
import 'react-medium-image-zoom/dist/styles.css'
import "react-awesome-lightbox/build/style.css";

export const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/users/*" element={<Quiz/>}/>
                </Route>

                <Route path="/admins/" element={<Admin/>}>
                    <Route index element={<DashBoard/>}/>
                    <Route path="manage-users" element={<ManageUser/>}/>
                    <Route path="manage-quizzes" element={<ManageQuiz/>}/>
                    <Route path={"questions"} element={<Questions/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>

                <Route path="/register" element={<Register/>}/>

                <Route path="/quiz/:quizId" element={<DetailQuiz/>}/>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={4000}
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