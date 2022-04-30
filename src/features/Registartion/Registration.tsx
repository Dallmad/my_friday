import {Field, Form, Formik} from 'formik';
import s from './Registration.module.css'
import Button from "../../components/Button/Button";


interface MyFormValues {
    email: string
    password: string
}

export const Registration = () => {

    const initialValues: MyFormValues = { email: '', password: '' };

    return (
        <div className={s.div}>
            <div>Registration form</div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form className={s.form}>
                    <div>
                        <label htmlFor="email">email</label>
                        <Field id="email" name="email" placeholder="email" />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <Field id="password" name="password" placeholder="password" />
                    </div>
                    {/*<div></div>*/}
                    <div>
                        <Button type="submit">sing up</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
