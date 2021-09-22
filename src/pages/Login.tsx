import { ErrorMessage, Field, Form, Formik } from "formik"
import styled from "styled-components"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { IUser } from "../models/IUser"

const Wrapper = styled.div`
    width: 300px;
    height: 200px;
    background-color: #272829;
`
const FormWrapper = styled.div`
    display: grid;
    padding: 20px;
`

export const Login: React.FC = () => {
    const {login} = useAppDispatch()

    const submit = (values: IUser) => {
        login(values.username, values.password)
    }

    return (
        <Wrapper>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={submit}
            >
                <Form>
                    <FormWrapper>
                        <Field type="input" name="username"/>
                        <Field type="password" name="password" />
                    </FormWrapper>
                    <ErrorMessage name="password" component='div' />
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </Wrapper>
    )
}