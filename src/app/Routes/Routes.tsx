import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../../features/ErrorPage/Error404';
import {Login} from '../../features/Login/Login';
import {Profile} from '../../features/Profile/Profile';
import {Registration} from '../../features/Registartion/Registration';
import {RecoveryPassword} from '../../features/Registartion/Recovery-password/RecoveryPassword';
import {Cards} from "../../features/Cards/Cards";
import {AllPacksList} from '../../features/PacksList/AllPacksList/AllPacksList';
import ForgotContainer from "../../features/Forgot/ForgotContainer";
import {NewPassword} from "../../features/Registartion/New-password/NewPassword";
import {NewPasswordContainer} from "../../features/Registartion/New-password/NewPasswordContainer";

export const PATH = {
    PROFILE:'/profile',
    LOGIN:'/login',
    ERROR404: '/404',
    REGISTRATION: '/registration',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD: '/set-new-password/*',
    ALL_PACKS_LIST: '/packs-list',
    MY_PACKS_LIST: '/my-packs-list',
    FORGOT_PASSWORD: '/forgot'
}

export const AppRoutes = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.ERROR404} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.ERROR404}/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<RecoveryPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPasswordContainer/>}/>
                <Route path={PATH.MY_PACKS_LIST+'/:user_id'} element={<AllPacksList/>}/>
                <Route path={PATH.ALL_PACKS_LIST} element={<AllPacksList/>}/>
                <Route path={PATH.ALL_PACKS_LIST+'/:pack_id'} element={<Cards/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotContainer/>}/>
            </Routes>
        </div>
    )
}
