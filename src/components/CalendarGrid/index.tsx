import moment, { Moment } from 'moment'
import { memo } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getCurrentDate } from '../../utils/getCurrentDate'
import { CalendarCell } from './CalendarCell'

const CalendarWrapper = styled.div<{withRows?: boolean}>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    ${props => props.withRows && 
        `grid-template-rows: repeat(6, 1fr);`}
    grid-gap: 1px;
    background-color: #404040;
    ${props => !props.withRows && 
        `border-bottom: 1px solid #404040;`}
`
const WeekDays = styled.span`
    background-color: #1F1E21;
    color: #929292;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 5px 5px 0;
`

type Props = {
    daysList: Moment[]
}

export const CalendarGrid: React.FC<Props> = ({daysList}) => {
    const {events} = useAppSelector(state => state.calendarReducer)

    return (
        <div>
            <CalendarWrapper>
                {
                    [...Array(7)].map((_, index) => 
                        <Weeks key={index} index={index}/>) 
                }
            </CalendarWrapper>
            <CalendarWrapper withRows>
                {
                    daysList.map((day) => {
                        let isEvent = events.filter(e => e.date === getCurrentDate(day, 'MM-DD-YYYY')) 
                        return (
                            isEvent.length !== 0 && (day > moment() || moment().isSame(day, 'day')) ? 
                                <CalendarCell
                                    event={isEvent}
                                    key={day.unix()}
                                    day={day}
                                /> : 
                                <CalendarCell
                                    key={day.unix()}
                                    day={day}
                                />
                        )
                    })
                }
            </CalendarWrapper>
        </div>
    )
}

const Weeks: React.FC<{index: number}> = memo(({index}) => {
    return (
        <WeekDays>{getCurrentDate(moment().day(index), 'ddd')}</WeekDays>
    )
})