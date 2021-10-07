import { Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import styled from './LoginForm.module.css'

export const LoginForm: React.FC = () => {
    const {login} = useAppDispatch()
    const {authError} = useAppSelector(state => state.authReducer)

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
                    <div className={styled.ButtonWrapper}>
                        <div className={styled.Error}>{authError}</div>
                        <button 
                            type="submit"
                        >
                            Submit                       
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}