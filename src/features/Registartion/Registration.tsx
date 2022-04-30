import {useFormik} from 'formik';
import s from './Registration.module.css'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";


interface MyFormValues {
    email?: string
    password?: string
}

export const Registration = () => {

    // const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: MyFormValues = {};
            return errors;
        },
        onSubmit: values => {
            // dispatch(loginTC(values))
            alert(JSON.stringify(values))
            formik.resetForm()
        },
    })

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
