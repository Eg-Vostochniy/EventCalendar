import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import styled from './LoginForm.module.css'

export const LoginForm: React.FC = () => {
    const {login} = useAppDispatch()
    const {isFetching} = useAppSelector(state => state.authReducer)

    const submit = (values: {username: string | null, password: string | null}) => {
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
                            <Field autoComplete='off' type="input" name="username"/>
                        </label>
                        <label className={styled.Label}>
                            <span>Password</span>
                            <Field type="password" name="password" />
                        </label>
                    </div>
                    <ErrorMessage name="password" component='div' />
                    <div className={styled.ButtonWrapper}>
                        <button 
                            type="submit"
                            disabled={isFetching}
                        >
                            Submit
                            {
                                isFetching && <span>Load</span>
                            }
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}