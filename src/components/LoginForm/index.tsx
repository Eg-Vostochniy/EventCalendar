import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { IUser } from "../../models/IUser"
import styled from './LoginForm.module.css'

export const LoginForm: React.FC = () => {
    const {login} = useAppDispatch()

    const submit = (values: IUser) => {
        login(values.username, values.password)
    }

    return (
        <div>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={submit}
            >
                <Form className={styled.Wrapper}>
                    <div className={styled.FormWrapper}>
                        <label className={styled.Label}>
                            <span>Username</span>
                            <Field type="input" name="username"/>
                        </label>
                        <label className={styled.Label}>
                            <span>Password</span>
                            <Field type="password" name="password" />
                        </label>
                    </div>
                    <ErrorMessage name="password" component='div' />
                    <div className={styled.ButtonWrapper}>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}