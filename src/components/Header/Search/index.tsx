import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { SearchList } from './SearchList'

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
    width: 165px;
    max-height: 170px;
    overflow: auto;
    z-index: 6;
    top: 12%;
    right: 7.1%;
    padding: 4px;
    border-radius: 5px;
`
const NoEvent = styled.div`
    font-size: 11.5px;
    color: #921a1a;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
`
const CheckAllLabel = styled.label`
    margin-right: 10px;
    & span{
        color: #964444;
        padding-left: 5px;
    }
`

export const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isAllEvents, setIsAllEvents] = useState(false)
    
    const wrapperRef = useRef(null)
    useClickOutside(wrapperRef, setIsOpen)
    const {events} = useAppSelector(state => state.calendarReducer)

    const filteredEvents = events.filter(e => e.title.toLowerCase()
        .indexOf(searchValue.toLowerCase()) !== -1)
    
    return (
        <>
            <div>
                <Input
                    onClick={() => setIsOpen(true)}
                    placeholder='Search'  
                    value={searchValue}
                    disabled={isAllEvents}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <CheckAllLabel>
                    <input 
                        type='checkbox'
                        checked={isAllEvents}
                        onClick={() => setIsAllEvents(!isAllEvents)}     
                    />
                    <span>All</span>
                </CheckAllLabel>
            </div>
            {
                isAllEvents ?
                    <SearchedEvents> 
                        {events.map(e => <SearchList event={e}/>)}
                    </SearchedEvents>:
                    searchValue !== '' && isOpen && 
                    <SearchedEvents ref={wrapperRef}>              
                        {
                            filteredEvents.length !== 0 ?
                                filteredEvents.map(e => <SearchList event={e}/>) :
                                <NoEvent>No events with this name</NoEvent>
                        }
                    </SearchedEvents>
                    
            }
        </>
    )
}