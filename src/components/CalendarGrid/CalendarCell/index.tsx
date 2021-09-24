import moment, { Moment } from 'moment'
import styled from 'styled-components'
import { IEvent } from '../../../models/IEvent'
import { CellEvent } from './CellEvents'
import { EventsAdder } from './EventsAdder'

const Cell = styled.div<{isCurrentDay: boolean, isWeekend: boolean, isCurrentMonth: boolean}>`
    min-width: 140px;
    min-height: 80px;
    background-color: ${props => props.isWeekend ? '#1F1E21' : '#272829'};
    color: ${props => {
        if(props.isCurrentDay) return '#bfbfbf'
        if(props.isCurrentMonth) return 'grey' 
        return '#DDDCDD'}};
`
const HeaderEvent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const RowInCell = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
const CellEventWrapper = styled.div`
    max-width: 130px;
    max-height: 40px;
    margin: 3px;
    font-size: 12px;
    overflow-y: scroll;
`

export const CalendarCell: React.FC<{day: Moment, event?: IEvent[]}> = ({day, event}) => {
    const isCurrentDay = (): boolean => moment().isSame(day, 'day')
    const isCurrentMonth = (): boolean => moment().isSame(day, 'month')
    const isFirstDayOfMonth = (): string | null => {
        if(day.format('D') === String(1)){
            return day.format('MMM')
        }
        return null
    }

    return (
        <Cell 
            isWeekend={day.day() === 0 || day.day() === 6 ? false : true}
            isCurrentDay={isCurrentDay() ? true : false}
            isCurrentMonth={isCurrentMonth() ? false : true}
        >
            <HeaderEvent>
                <EventsAdder
                    day={day} 
                    isCurrentDay={isCurrentDay}
                    isCurrentMonth={isCurrentMonth}
                />

                <RowInCell>
                    <DayWrapper 
                        isCurrentDay={isCurrentDay() ? true : false}
                        isFirstDay={isFirstDayOfMonth() ? true : false}
                    >   
                        <div>{isFirstDayOfMonth()}</div>
                        <div>{day.format('D')}</div>                           
                    </DayWrapper>
                </RowInCell>
            </HeaderEvent>

            <CellEventWrapper>
                {
                    event && event.map(e => <CellEvent key={e.id} event={e}/>)
                }
            </CellEventWrapper>
        </Cell>
    )
}