import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../../features/ErrorPage/Error404';
import {Login} from '../../features/Login/Login';
import {Profile} from '../../features/Profile/Profile';
import {TestPage} from '../../features/TestPage/TestPage';
import {Registration} from '../../features/Registartion/Registration';
import {NewPassword} from '../../features/Registartion/New-password/NewPassword';
import {RecoveryPassword} from '../../features/Registartion/Recovery-password/RecoveryPassword';
import {Cards} from "../../features/Cards/Cards";
import {AllPacksList} from '../../features/PacksList/AllPacksList/AllPacksList';

export const PATH = {
    PROFILE:'/profile',
    LOGIN:'/login',
    ERROR404: '/404',
    TEST_PAGE: '/test',
    REGISTRATION: '/registration',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD: '/new-password',
    ALL_PACKS_LIST: '/all-packs-list',
    MY_PACKS_LIST: '/my-packs-list',
    CARDS: '/cards',
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
                <Route path={PATH.TEST_PAGE} element={<TestPage/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<RecoveryPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.MY_PACKS_LIST} element={<AllPacksList/>}/>
                <Route path={PATH.ALL_PACKS_LIST} element={<AllPacksList/>}/>
                <Route path={PATH.ALL_PACKS_LIST+'/:pack_id'} element={<Cards/>}/>
            </Routes>
        </div>
    )
}
