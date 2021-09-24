import { Moment } from 'moment'
import styled from 'styled-components'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { getCurrentDate } from '../../../../utils/getCurrentDate'

const AddEventSpan = styled.span`
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.5s, opacity 0.5s linear;
`
const AddEvent = styled.div`
    transition: 3s;
    font-size: 12px;
    cursor: pointer;
    padding-left: 5px;
    &:hover ${AddEventSpan}{
        transition: all 2s ease-in-out;
        visibility: visible;
        opacity: 1;
        transition: visibility 0.5s, opacity 0.5s linear;
    }
`
const PlusSpan = styled.span<{isCurrentDay: boolean, isCurrentMonth: boolean}>`
    margin-right: 5px;
    border: 1px solid ${props => {
        if(props.isCurrentDay) return '#ae0e0e'
        if(props.isCurrentMonth) return 'grey' 
        return '#DDDCDD'}};
    border-radius: 50px;
    padding: 0 4px;
`

type Props = {
    isCurrentDay: () => boolean
    isCurrentMonth: () => boolean
    day: Moment
}

export const EventsAdder: React.FC<Props> = ({isCurrentDay, isCurrentMonth, day}) => {
    const {setIsModal, setCurrentDate} = useAppDispatch()
    
    const openEventModal = () => {
        setIsModal(true)
        setCurrentDate(getCurrentDate(day, 'MM-DD-YYYY'))
    }
    
    return (
        <AddEvent onClick={openEventModal}>
            <PlusSpan
                isCurrentDay={isCurrentDay() ? true : false}
                isCurrentMonth={isCurrentMonth() ? false : true}
            >+
            </PlusSpan>
            <AddEventSpan>Add event</AddEventSpan>
        </AddEvent>
    )
}