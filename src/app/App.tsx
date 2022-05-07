import React, {useEffect} from 'react';
import s from './App.module.css';
import {AppRoutes} from './Routes/Routes';
import {Header} from './Header/Header';
import {authAPI} from "../api/auth-api";
import {setIsLoggedIn, setUser} from "../state/auth-reducer";
import {useTypedDispatch} from "../state/store";
import {setProfileStateThunk} from "../state/profile-reducer";


export const App = () => {

    const dispatch = useTypedDispatch()

    useEffect( () => {
        dispatch(setUser())
    }, [])


    return (
        <div className={s.app}>
                <Header/>
                <AppRoutes/>
        </div>
    )
}
