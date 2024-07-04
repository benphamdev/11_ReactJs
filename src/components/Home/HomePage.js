import {useTranslation, Trans} from "react-i18next";
import videoHomepage from '../../assets/video/video-homepage.mp4';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HomePage = (props) => {
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation('translation');
    return (
        <div className="homepage-container">
            <video autoPlay loop muted width="750px" height="500px">
                <source src={videoHomepage} type="video/mp4"/>
            </video>

            <div className='homepage-content'>
                <div className="title-1">
                    {t('homepage.title1')}
                </div>
                <div className="title-2">
                    {t('homepage.title2')}
                </div>
                <div className="title-3">
                    {
                        isAuthenticated
                            ? <button onClick={() => navigate("/users")}>{t('homepage.title3.start')}</button>
                            : <button onClick={() => navigate("/login")}>{t('homepage.title3.free')}</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;