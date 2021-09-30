import { memo } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { IEvent } from '../../../../models/IEvent'

const Wrapper = styled.div`
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 14px;
    text-transform: uppercase;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover{
        color: #773a3a;
        transition: all 0.5s ease-in-out;
    }
`

export const CellEvent: React.FC<{event: IEvent}> = memo(({event}) => {
    const {setIsModalEvent, setCurrentEvent} = useAppDispatch()
    const handleClick = () => {
        setCurrentEvent(event)
        setIsModalEvent(true)
    }

    return (
        <Wrapper onClick={handleClick}>
            {event.title}
        </Wrapper>
    )
})
