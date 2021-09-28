import { Field, Form, Formik } from "formik"
import { useEffect, useRef } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useClickOutside } from "../../hooks/useClickOutside"
import { IEvent } from "../../models/IEvent"

const Wrapper = styled.div`
    width: 250px;
    height: 300px;
    background-color: #999393;
    box-shadow: 0 3px 8px 2px #494949f8;;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
`
const Container = styled.div`
    display: grid;
    padding: 8px;
`
const CloseModal = styled.div`
    max-width: 15px;
    max-height: 15px;
    font-size: 19px;
    font-weight: bold;
    cursor: pointer;
    color: #6a1b1b;
    transition: all 0.5s ease-out;
    &:hover{
        font-size: 21px;
        color: white;
        transition: all 0.5s ease-in;
    }
`
const Title = styled.span`
    padding: 6px 0 8px 0;
    font-size: 17px;
    color: #591212f9;
    text-align: center;
    font-weight: bold;
`

export const ModalWindow: React.FC<{}> = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {setIsModal, fetchUsers, addNewEvent} = useAppDispatch()
    const {currentDate, events} = useAppSelector(state => state.calendarReducer)
    const {users, owner} = useAppSelector(state => state.authReducer)

    useClickOutside(wrapperRef)

    const submit = (values: IEvent) => {
        addNewEvent(values)
        setIsModal(false)
    }
    useEffect(() => {
        fetchUsers()
        //eslint-disable-next-line
    }, []) 
    
    return (
        <Wrapper ref={wrapperRef}>
            <Container>               
                <CloseModal onClick={() => setIsModal(false)}>X</CloseModal>
                <Title>Add new event</Title>
                <Formik
                initialValues={{id: events.length, 
                                title: '', 
                                creator: owner.username, 
                                description: '', 
                                date: currentDate, 
                                guests: ['']}}
                onSubmit={submit}
            >
                <Form>
                    
                    <Field type="input" name="title"/>
                
                    <Field type="input" name="description" />
                    
                    <Field type="input" disabled name="date"/>
                
                    <Field as="select" multiple name="guests">
                        {
                            users && users.map(a => <option
                                                        key={a.id} 
                                                        value={a.username || undefined}
                                                    >{a.username}
                                                    </option>)
                        }
                    </Field>
                
                    <button type="submit">
                        Submit
                    </button>
                    
                </Form>
            </Formik>
            </Container>
        </Wrapper>     
    )
}