import moment from "moment"
import styled from "styled-components"
import { useAppDispatch } from "../../../../hooks/useAppDispatch"
import { IEvent } from "../../../../models/IEvent"
import { getCurrentDate } from "../../../../utils/getCurrentDate"

const EventDiv = styled.div<{isAvailable?: boolean}>`
    ${props => props.isAvailable && `color: #921a1a;`}
    cursor: pointer;
`

export const SearchList: React.FC<{event: IEvent}> = ({event}) => {
    const {setIsModalEvent, setCurrentEvent} = useAppDispatch()

    const handleClick = (event: IEvent) => {
        setCurrentEvent(event)
        setIsModalEvent(true)
    }

    return (
        <>
        {
            Number(event.date.split('-').join('')) < Number(getCurrentDate(moment(), 'MMDDYYYY'))
                ?
                    <EventDiv 
                        isAvailable 
                        key={event.id}
                        onClick={() => handleClick(event)}
                    >
                        {event.title}
                    </EventDiv> 
                :
                    <EventDiv 
                        key={event.id} 
                        onClick={() => handleClick(event)}
                    >
                        {event.title}
                    </EventDiv>
        }
        </>
    )
}