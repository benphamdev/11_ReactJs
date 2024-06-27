import videoHomepage from '../../assets/video/video-homepage.mp4';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HomePage = (props) => {
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted width="750px" height="500px">
                <source src={videoHomepage} type="video/mp4"/>
            </video>

            <div className='homepage-content'>
                <div className="title-1">
                    Make forms worth filling out
                </div>
                <div className="title-2">
                    Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly
                    different.
                </div>
                <div className="title-3">
                    {
                        isAuthenticated
                            ? <button onClick={() => navigate("/users")}>Get started now</button>
                            : <button onClick={() => navigate("/login")}>Get started-it's free</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;