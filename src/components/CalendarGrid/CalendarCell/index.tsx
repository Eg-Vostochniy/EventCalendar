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
const DayWrapper = styled.div<{isCurrentDay: boolean, isFirstDay: boolean}>`
    display: flex;
    align-items: center;
    height: 27px;
    width: 27px;
    justify-content: center;
    ${props => props.isFirstDay ? 
        `
            height: 30px;
            width: 40px;
            justify-content: space-around;
        ` : null  
    }
    ${props => props.isCurrentDay ? 
        `
            background-color: #ae0e0e;
            border: 2px #5c0606 solid;
            border-radius: 50px;
        ` : null
    }
`

export const CalendarCell: React.FC<{day: Moment}> = memo(({day}) => {
    const isCurrentDay = (cDay: Moment): boolean => moment().isSame(cDay, 'day')
    const isCurrentMonth = (cMonth: Moment): boolean => moment().isSame(cMonth, 'month')
    const isFirstDayOfMonth = (firstDay: Moment): string | null => {
        if(firstDay.format('D') === String(1)){
            return firstDay.format('MMM')
        }
        return null
    }

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
                    isFirstDay={isFirstDayOfMonth(day) ? true : false}
                >
                    <div>{isFirstDayOfMonth(day)}</div>
                    <div>{day.format('D')}</div>
                </DayWrapper>
            </RowInCell>
        </Cell>
    )
}, (prev: any, next: any) => prev._d === next._d)