import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import s from './App.module.css';
import {AppRoutes} from './Routes/Routes';
import {Header} from './Header/Header';


export const App = () => {


    return (
        <div className={s.app}>
                <Header/>
                <AppRoutes/>
        </div>
    )
}