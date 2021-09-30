import moment from 'moment'
import { useEffect, useState } from 'react'
import { CalendarGrid } from '../components/CalendarGrid'
import { CalendarHeader } from '../components/CalendarHeader'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { getCurrentDate } from '../utils/getCurrentDate'

const totalDaysInGrid = 42

export const Calendar: React.FC = () => {
    const [today, setToday] = useState(moment())
    const {fetchEvents, fetchUsers} = useAppDispatch()
    const {username} = useAppSelector(state => state.authReducer.owner)
    
    const currentMonth = getCurrentDate(today, 'MMMM')
    const currentYear = getCurrentDate(today, 'YYYY')

    const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day')
    const daysList = [...Array(totalDaysInGrid)].map(() => startDay.add(1, 'day').clone())
    
    useEffect(() => {
        fetchEvents(username)
        fetchUsers()
        //eslint-disable-next-line
    }, [username])
    
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