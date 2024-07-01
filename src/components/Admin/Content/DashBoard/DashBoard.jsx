import './DashBoard.scss'
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getDashboardData} from "../../../../services/api/AuthService";

const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        let response = await getDashboardData();
        if (response && response.EC === 0) {
            setDataOverview(response.DT);
            setDataChart([
                {
                    "name": "Quizzes",
                    "qz": response?.DT?.others?.countQuiz ?? 0,
                },
                {
                    "name": "Questions",
                    "qs": response?.DT?.others?.countQuestions ?? 0,
                },
                {
                    "name": "Answers",
                    'as': response?.DT?.others?.countAnswers ?? 0,
                },
            ]);
        } else {

        }
    }

    return (
        <div className="dashboard-container">
            <div className={'title'}>Welcome to the admin dashboard</div>

            <div className={'content'}>
                <div className={'left-panel'}>
                    <div className={'child'}>
                        <span className={'text-1'}>Total User</span>
                        <span className={'text-2'}>
                            {dataOverview?.users?.total ?? 10}
                        </span>
                    </div>
                    <div className={'child'}>
                        <span className={'text-1'}>
                            Total User
                        </span>
                        <span className={'text-2'}>
                            {dataOverview?.users?.countUsers ?? 10}
                        </span>
                    </div>
                    <div className={'child'}>
                        <span className={'text-1'}>
                            Total Question
                        </span>
                        <span className={'text-2'}>
                            {
                                dataOverview?.others?.countQuestions ?? 10
                            }
                        </span>
                    </div>
                    <div className={'child'}>
                        <span className={'text-1'}>
                            Total answer
                        </span>
                        <span className={'text-2'}>
                            {dataOverview?.others?.countAnswers ?? 10}
                        </span>
                    </div>
                </div>

                <div className={'right-panel'}>
                    <ResponsiveContainer width="96%" height={"96%"}>
                        <BarChart data={dataChart} margin={{top: 25, right: 5, left: 5, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="qz" fill="#8884d8"/>
                            <Bar dataKey="qs" fill="#82ca9d"/>
                            <Bar dataKey="as" fill="#7fd12e"/>
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
}

export default DashBoard;