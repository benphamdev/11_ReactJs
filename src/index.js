import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./Layout";
import {PersistGate} from "redux-persist/integration/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-awesome-lightbox/build/style.css";
import React from "react";
import './configs/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/*<React.StrictMode>*/}
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </PersistGate>
        {/*</React.StrictMode>*/}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
