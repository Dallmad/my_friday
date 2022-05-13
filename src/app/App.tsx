import React, {useEffect} from 'react';
import s from './App.module.css';
import {AppRoutes} from './Routes/Routes';
import {Header} from './Header/Header';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export const App = () => {

    return (
        <div className={s.app}>
            <div>
                <Header/>
            </div>
            <div className={s.routes}>
                <AppRoutes/>
            </div>
            <ErrorSnackbar/>
        </div>
    )
}
