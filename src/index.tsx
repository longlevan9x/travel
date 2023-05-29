import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from "./Header";
import RegionComponent from "./Region";
import ProVinceComponent from "./Province";
import {Provider} from "react-redux";
// import Carousel from "./Carousel";
import store from './store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <React.StrictMode>
            <Provider store={store}>
                <Header></Header>
                {/*<Carousel></Carousel>*/}
                <RegionComponent></RegionComponent>
                <ProVinceComponent></ProVinceComponent>
                {/*<App/>*/}
            </Provider>
        </React.StrictMode>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
