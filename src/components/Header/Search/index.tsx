import moment from 'moment'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { getCurrentDate } from '../../../utils/getCurrentDate'
import { IEvent } from '../../../models/IEvent'
import { useClickOutside } from '../../../hooks/useClickOutside'

const Input = styled.input`
    background-color: #404040;
    border: none;
    color: #E6E6E6;
    outline: none;
    border-radius: 4px;
    margin: 10px 10px 3px 0;
    padding: 2.6px 6px;
    font-size: 15px;
`
const SearchedEvents = styled.div`
    color: black;
    background-color: #ffffffa8;
    position: absolute;
    width: 160px;
    max-height: 170px;
    overflow: auto;
    z-index: 6;
    top: 12%;
    right: 3%;
    padding: 4px;
    border-radius: 5px;
`
const EventDiv = styled.div<{isAvailable?: boolean}>`
    ${props => props.isAvailable && `color: #921a1a;`}
    cursor: pointer;
`
const NoEvent = styled.div`
    font-size: 11.5px;
    color: #921a1a;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
`

export const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    
    const {setIsModalEvent, setCurrentEvent} = useAppDispatch()
    const wrapperRef = useRef(null)
    const {events} = useAppSelector(state => state.calendarReducer)

    const filteredEvents = events.filter(e => e.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    useClickOutside(wrapperRef, setIsOpen)

    const handleClick = (event: IEvent) => {
        setCurrentEvent(event)
        setIsModalEvent(true)
    }
    
    return (
        <>
            <Input
                onClick={() => setIsOpen(true)}
                placeholder='Search'  
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            {
                searchValue !== '' && isOpen &&
                <SearchedEvents ref={wrapperRef}>
                    {
                        filteredEvents.length !== 0 ?
                            filteredEvents.map(e => {
                                return Number(e.date.split('-').join('')) < Number(getCurrentDate(moment(), 'MMDDYYYY')) ?
                                    <EventDiv 
                                        isAvailable 
                                        key={e.id}
                                        onClick={() => handleClick(e)}
                                    >
                                        {e.title}
                                    </EventDiv> :
                                    <EventDiv 
                                        key={e.id} 
                                        onClick={() => handleClick(e)}
                                    >
                                        {e.title}
                                    </EventDiv>
                            }) :
                            <NoEvent>No events with this name</NoEvent> 
                    }
                </SearchedEvents>
            }
        </>
    )
}