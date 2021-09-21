import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { IUser } from "../models/IUser"

export const Login: React.FC = () => {
    const {setOwner, login} = useAppDispatch()
    const submit = (values: IUser) => {
        login(values.username, values.password)
        setOwner(values)
    }
    return (
        <div>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={submit}
            >
                <Form>
                    <Field type="input" name="username" />
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    )
}