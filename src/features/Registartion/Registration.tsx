import {useFormik} from 'formik';
import s from './Registration.module.css'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {RegistrationType} from "../../API registration/registration-api";
import {registrationTC} from "../../state/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import {AppRootStateType} from "../../state/store";


interface MyFormValues {
    email?: string
    password?: string
}

export const Registration = () => {

    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values: RegistrationType) => {
            const errors: MyFormValues = {};
            return errors;
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(registrationTC(values))
            formik.resetForm()
        },
    })

    if (isRegistration) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={s.div}>
            <div>Registration form</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <div>
                        <label htmlFor="email">email</label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <Input
                            id="password"
                            name="password"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                    <div>
                        <Button type="submit">sing up</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
