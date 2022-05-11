import {useFormik} from 'formik';
import s from './Registration.module.css'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {registrationTC} from "../../state/registration-reducer";
import {useSelector} from "react-redux";
import {Navigate, NavLink} from 'react-router-dom';
import {AppRootStateType, useTypedDispatch} from '../../state/store';
import React from 'react';
import {PATH} from '../../app/Routes/Routes';


export const Registration = () => {

    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useTypedDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            dispatch(registrationTC(values))
            formik.resetForm()
        },
    })

    if (isRegistration) {
        return <Navigate to='/login'/>
    }

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <div className={s.div}>
            <div className={s.title}>Registration form</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <div>
                        <Input
                            label={'email'}
                            type="Email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    </div>
                    <div>
                        <Input
                            label={'password'}
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    </div>
                    <div>
                        <Button type="submit">Register</Button>

                    </div>
                </div>
            </form>
            <div className={s.link}>
                <NavLink to={PATH.LOGIN} className={s.link}>Cancel</NavLink>
            </div>
        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
}
