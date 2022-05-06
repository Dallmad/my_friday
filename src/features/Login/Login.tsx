import React from 'react'
import {Navigate, NavLink} from 'react-router-dom';
import s from './Login.module.css'
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import {login} from '../../state/auth-reducer';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {PATH} from '../../app/Routes/Routes';


export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useTypedDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 7) {
                errors.password = 'Password should be more 7 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <div className={s.div}>
            <div className={s.title}>Sign In</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.container}>
                    <Input
                        type="Email"
                        placeholder={'Enter your email'}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <Input
                        type="password"
                        placeholder={'Enter password'}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password
                        && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <div className={s.checkbox}>
                        <label>Remember me</label>
                        <Checkbox
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <Button type={'submit'}>
                        Login
                    </Button>
                </div>
            </form>
            <div className={s.link}>
                <NavLink to={PATH.REGISTRATION} className={s.link}>Sign Up</NavLink>
            </div>
        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}