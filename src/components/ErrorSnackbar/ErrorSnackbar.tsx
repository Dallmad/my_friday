import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {setErrorAC} from '../../state/profile-reducer';
import Button from '../Button/Button';
import s from './ErrorSnackbar.module.css'
import {useEffect, useState} from 'react';
import {loading} from '../../state/registration-reducer';

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string>(state => state.profile.error)
    const dispatch = useDispatch()

    const [err, setErr] = useState(false)

    useEffect(() => {
        if (error) {
            setErr(true)
            const timer = setTimeout(() => {
                dispatch(setErrorAC(error))
                dispatch(loading(false))
                setErr(false)
            }, 4500)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleClose = () => {
        dispatch(setErrorAC(''))
        dispatch(loading(false))
        setErr(false)
    }

    return (
        <div className={s.div}>
            {err && <Button onClick={handleClose} red>{error}</Button>}
        </div>
    )
}