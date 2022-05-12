import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {setErrorAC} from '../../state/profile-reducer';
import s from './ErrorSnackbar.module.css'
import {useEffect, useState} from 'react';
import {loading} from '../../state/registration-reducer';

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string>(state => state.profile.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setErrorAC(''))
                dispatch(loading(false))
             //   setErr(false)
            }, 4500)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleClose = () => {
        dispatch(setErrorAC(''))
        dispatch(loading(false))
    }

    return (
        <div className={s.div}>
            {error && <div onClick={handleClose} style={{backgroundColor:'red'}}>{error}</div>}
        </div>
    )
}