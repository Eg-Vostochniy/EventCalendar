import moment from 'moment'
import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getCurrentDate } from '../../../utils/getCurrentDate'

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
    width: 140px;
    max-height: 170px;
    overflow: scroll;
    z-index: 6;
    top: 12%;
    right: 4%;
`
const EventDiv = styled.div<{isAvailable?: boolean}>`
    ${props => props.isAvailable && `color: red;`}
`

export const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const {events} = useAppSelector(state => state.calendarReducer)
    const filteredEvents = events.filter(e => e.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    
    const handleChange = (e: any) => {
        setSearchValue(e.target.value)
    }
    
    return (
        <>
            <Input
                placeholder='Search'  
                value={searchValue}
                onChange={handleChange}
            />
            {
                searchValue !== '' &&
                <SearchedEvents>
                    {
                        filteredEvents.length !== 0 ?
                            filteredEvents.map(e => {
                                return Number(e.date.split('-').join('')) < Number(getCurrentDate(moment(), 'MMDDYYYY')) ?
                                    <EventDiv 
                                        isAvailable 
                                        key={e.id}>{e.title}
                                    </EventDiv> :
                                    <EventDiv key={e.id}>{e.title}</EventDiv>
                            }) :
                            <div>No events with this name</div> 
                    }
                </SearchedEvents>
            }
        </>
    )
}