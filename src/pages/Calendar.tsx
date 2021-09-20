import moment from 'moment'
import { useState } from 'react'
import { CalendarGrid } from '../components/CalendarGrid'
import { CalendarHeader } from '../components/CalendarHeader'

export const Calendar: React.FC = () => {
    const [today, setToday] = useState(moment())

    const currentMonth = today.format('MMMM')
    const currentYear = today.format('YYYY')

    const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day')
    const totalDaysInGrid = 42
    
    const daysList = [...Array(totalDaysInGrid)].map(() => startDay.add(1, 'day').clone())
        
    const prevHandler = () => {
        setToday(today.subtract(1, 'month').clone())
    }
    const todayHandler = () => {
        setToday(moment())
    }
    const nextHandler = () => {
        setToday(today.add(1, 'month').clone())
    }
    return (
        <div>
            <CalendarHeader 
                currentMonth={currentMonth}
                currentYear={currentYear}
                prevMonth={prevHandler}
                todayHandler={todayHandler}
                nextMonth={nextHandler}
            />
            <CalendarGrid 
                daysList={daysList}
            />
        </div>
    )
}