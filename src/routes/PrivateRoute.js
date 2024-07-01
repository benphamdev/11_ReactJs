import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <>
            {props.children}
        </>
    )
}