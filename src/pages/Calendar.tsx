import moment from 'moment'
import { useEffect, useState } from 'react'
import { CalendarGrid } from '../components/CalendarGrid'
import { CalendarHeader } from '../components/CalendarHeader'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

const totalDaysInGrid = 42

export const Calendar: React.FC = () => {
    const [today, setToday] = useState(moment())
    const {fetchEvents} = useAppDispatch()
    const {events} = useAppSelector(state => state.calendarReducer)
    
    const currentMonth = today.format('MMMM')
    const currentYear = today.format('YYYY')

    const formatStartDay = today.clone().startOf('month').startOf('week').format('MM-DD-YYYY')
    const formatEndDay = today.clone().endOf('month').endOf('week').format('MM-DD-YYYY')

    const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day')
    const daysList = [...Array(totalDaysInGrid)].map(() => startDay.add(1, 'day').clone())
    
    useEffect(() => {
        fetchEvents(formatStartDay, formatEndDay, 'user1')
        //eslint-disable-next-line
    }, [formatStartDay, formatEndDay])
    
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