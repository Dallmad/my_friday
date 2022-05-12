import React from 'react'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import s from '../../components/Button/Button.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {AppRootStateType, useTypedDispatch} from "../../state/store";
import {useFormik} from "formik";
import {PATH} from "../../app/Routes/Routes";
import {forgotPasswordTC} from "../../state/forgot-password-reducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {useSelector} from "react-redux";


export const ForgotPassword = () => {

    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useTypedDispatch()

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
        },
        onSubmit: values => {
            dispatch(forgotPasswordTC())
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
                {isLoggedIn && <Preloader/>}
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.form}>
                        <div>
                            <Input
                                label={'email'}
                                type="Email"
                                {...formik.getFieldProps('email')}
                                // label={''}
                            />
                            {formik.touched.email && formik.errors.email
                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        </div>
                        <div>
                            <Button type="submit">Send</Button>

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
    }