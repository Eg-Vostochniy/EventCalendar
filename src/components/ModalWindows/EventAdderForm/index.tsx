import { Field, Form, Formik } from "formik"
import { useRef } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { IEvent } from "../../../models/IEvent"

const Wrapper = styled.div`
    width: 250px;
    height: 370px;
    background-color: #999393ef;
    box-shadow: 0 3px 8px 2px #494949f8;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    text-transform: uppercase;
`
const Container = styled.div`
    display: grid;
    padding: 8px 15px;
    & label{
        display: grid;
        margin-bottom: 10px;
        color: #2b2a2c;
    }
    & input{
        padding: 4px;
        background-color: rgb(145, 142, 142);
        border: 1px solid rgb(46, 34, 34);
        outline: none;
        color: #232224;
        box-shadow: 0 2px 4px 2px #686868f8;
    }
    & button{
        background-color: rgb(121, 56, 56);
        border: 1px solid rgb(172, 166, 166);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        color: #232224;
        font-size: 16px;
        padding: 1px 9px;
    }
`
const CloseModal = styled.div`
    max-width: 20px;
    max-height: 20px;
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
const UserOption = styled.option`
    color: #232224;
    background-color: rgb(145, 142, 142);
`

export const EventAdderForm: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {setIsModalEventsAdder, addNewEvent} = useAppDispatch()
    const {currentDate, events} = useAppSelector(state => state.calendarReducer)
    const {users, owner} = useAppSelector(state => state.authReducer)

    useClickOutside(wrapperRef, setIsModalEventsAdder)

    const submit = (values: IEvent) => {
        addNewEvent(values)
        setIsModalEventsAdder(false)
    }
    
    return (
        <Wrapper ref={wrapperRef}>
            <Container>               
                <CloseModal onClick={() => setIsModalEventsAdder(false)}>X</CloseModal>
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
                    <label>
                        <span>Title</span>               
                        <Field 
                            autoComplete='off' 
                            type="input" 
                            name="title"
                        />
                    </label>
                    <label>
                        <span>Description</span>               
                        <Field autoComplete='off' type="input" name="description"/>
                    </label>
                    <label>
                        <span>Date</span>               
                        <Field type="input" disabled name="date"/>
                    </label>
                    <label>
                        <span>Add guests</span>               
                        <Field as="select" multiple name="guests">
                        {
                            users && owner && users.map(u => 
                                    <UserOption
                                        key={u.id} 
                                        value={u.username || undefined}
                                    >{u.username}
                                    </UserOption>)
                        }
                        </Field>
                    </label>                                                      
                        
                    <button type="submit">
                        Submit
                    </button>             
                </Form>
            </Formik>
            </Container>
        </Wrapper>     
    )
}