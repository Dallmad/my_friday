import React from 'react';
import preloader from "../../assets/images/loading-buffering.gif";
import s from './Preloader.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';

export const Preloader = () => {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)

    return (
        <div>
            {isLoading && <img src={preloader} alt="loading" className={s.img}/>}
        </div>
    );
};
