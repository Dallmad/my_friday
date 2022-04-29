import React from 'react'
import { Navigate } from 'react-router-dom';
import s from './Login.module.css'

export const Login = () => {

    /*if (isLoggedIn) {
        return <Navigate to='/'/>
    }*/

    return (
        <div className={s.div}>
            Login
        </div>
    )
}