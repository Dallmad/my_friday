import React from "react";
import Button from "../Button/Button";
import {logout} from "../../state/auth-reducer";
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {PATH} from '../../app/Routes/Routes';
import s from '../../app/Header/Header.module.css';

export const Logout = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useTypedDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            {isLoggedIn ? <Button onClick={logoutHandler}>Logout</Button>
                : <NavLink to={PATH.LOGIN} className={s.link}>Login</NavLink>}
        </>
    )
}