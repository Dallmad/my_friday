import React from 'react'
import { Navigate } from 'react-router-dom';
import s from './Login.module.css'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {loginTC} from '../../state/auth-reducer';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

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
            //dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div className={s.div}>
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
                        //name='Password'
                        placeholder={'Enter password'}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password
                        && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <div>
                        <label>Remember me</label>
                            <Checkbox
                                {...formik.getFieldProps('rememberMe')}
                            />
                    </div>

                    <Button
                        type={'submit'}
                        //variant={'contained'}
                        color={'primary'}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}