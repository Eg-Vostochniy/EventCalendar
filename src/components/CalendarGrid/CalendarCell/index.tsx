import moment, { Moment } from 'moment'
import { memo } from 'react'
import styled from 'styled-components'

const Cell = styled.div<{isCurrentDay: boolean, isWeekend: boolean, isCurrentMonth: boolean}>`
    min-width: 140px;
    min-height: 80px;
    background-color: ${props => props.isWeekend ? '#1F1E21' : '#272829'};
    color: ${props => {
        if(props.isCurrentDay) return 'black'
        if(props.isCurrentMonth) return 'grey' 
        return '#DDDCDD'}};
`
const RowInCell = styled.div`
    display: flex;
    justify-content: flex-end;
`
const DayWrapper = styled.div<{isCurrentDay: boolean}>`
    height: 27px;
    width: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.isCurrentDay ? 
        `
            background-color: #ae0e0e;
            border: 2px #5c0606 solid;
            border-radius: 50px;
        ` : null
    }
`

export const CalendarCell: React.FC<{day: Moment}> = memo(({day}) => {
    const isCurrentDay = (day: Moment): boolean => moment().isSame(day, 'day')
    const isCurrentMonth = (day: Moment): boolean => moment().isSame(day, 'month')
    
    return (
        <Cell 
            key={day.unix()}
            isWeekend={day.day() === 0 || day.day() === 6 ? false : true}
            isCurrentDay={isCurrentDay(day) ? true : false}
            isCurrentMonth={isCurrentMonth(day) ? false : true}
        >
            <RowInCell>
                <DayWrapper 
                    isCurrentDay={isCurrentDay(day) ? true : false}
                >
                    {day.format('D')}
                </DayWrapper>
            </RowInCell>
        </Cell>
    )
}, (prev: any, next: any) => prev._d === next._d)