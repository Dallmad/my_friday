import React from 'react';
import s from './App.module.css';
import {AppRoutes} from './Routes/Routes';
import {Header} from './Header/Header';
import {Profile} from "../features/Profile/Profile";


export const App = () => {

    return (
        <div className={s.app}>
            <Header/>
            <AppRoutes/>

        </div>
    )
}
