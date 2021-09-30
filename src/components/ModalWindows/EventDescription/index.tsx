import { useRef } from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { useClickOutside } from "../../../hooks/useClickOutside"

const Wrapper = styled.div`
    width: 350px;
    max-height: 500px;
    background-color: #999393;
    box-shadow: 0 3px 8px 2px #494949f8;;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    text-transform: uppercase;
    color: #7c0303;
`
const Container = styled.div`
    display: grid;
    padding: 8px;
`
const CloseModal = styled.div`
    width: 20px;
    height: 20px;
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
const Info = styled.span`
    padding: 6px 0 8px 0;
    font-size: 17px;
    color: #591212f9;
    text-align: center;
    font-weight: bold;
`
const Title = styled.div`
    width: 340px;
    max-height: 80px;
    overflow: auto;
    word-wrap: break-word;
    font-size: 17px;
    color: white;
    text-transform: none;
    margin-bottom: 5px;
`
const Description = styled.div`
    width: 340px;
    max-height: 80px;
    overflow: auto;
    word-wrap: break-word;
    font-size: 17px;
    color: white;
    text-transform: none;
    margin-bottom: 5px;
`
const Date = styled.div`
    font-size: 17px;
    color: white;
    text-transform: none;
    margin-bottom: 5px;
`
const Creator = styled.div`
    font-size: 17px;
    color: white;
    text-transform: none;
    margin-bottom: 5px;
`
const Guests = styled.div`
    max-height: 80px;
    overflow: auto;
    font-size: 17px;
    color: white;
    text-transform: none;
    margin-bottom: 5px;
`
const Buttons = styled.div`
    display: flex;
    justify-content: right;
    margin: 2px 0 5px 0;
    & button {
        padding: 3px 10px;
        color: #302a2ada;
        text-transform: uppercase;
        font-size: 13px;
        outline: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #af3232;
        margin: 0 10px 0 5px
    }
`

export const EventDescription: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {setIsModalEvent, deleteEvent} = useAppDispatch()
    const {currentEvent} = useAppSelector(state => state.calendarReducer)
    
    useClickOutside(wrapperRef, setIsModalEvent)
    const handleClick = () => {
        deleteEvent(currentEvent.id)
        setIsModalEvent(false)
    }

    return (
        <Wrapper ref={wrapperRef}>
            <Container>               
                <CloseModal onClick={() => setIsModalEvent(false)}>X</CloseModal>
                <Info>Event information</Info>
                Title:<Title>{currentEvent.title}</Title>
                Description: <Description>{currentEvent.description}</Description>
                Date: <Date>{currentEvent.date}</Date>
                Creator: <Creator>{currentEvent.creator}</Creator>
                Guests:
                    <Guests>
                        {
                            currentEvent.guests.map((g, index) => <div key={index}>{g}</div>)
                        }
                    </Guests>
                <Buttons>
                    <button onClick={handleClick}>Delete</button>
                </Buttons>
            </Container>
        </Wrapper>     
    )
}