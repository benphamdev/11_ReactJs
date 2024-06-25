import videoHomepage from '../../assets/video/video-homepage.mp4';
import {useSelector} from "react-redux";

const HomePage = (props) => {
    const accountSelector = useSelector((state) => state.userReducer.account);
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);

    console.log("accountSelector : ", accountSelector)
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
                    <button>Get started-it's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;