import styled from "styled-components"
import { CurrentDate } from "./CurrentDate"

const Wrapper = styled.div`
    background-color: #1F1E21;
    padding: 10px;
`
const DateNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #E6E6E6;
    font-weight: bold;
    font-size: 20px;
    color: #E6E6E6;
`
const Button = styled.button`
    background-color: #565759;
    color: #E6E6E6;
    border: none;
    padding: 4px;
    margin: 1px;
    cursor: pointer;
    border-radius: 3px;
`
type Props = {
    currentMonth: string
    currentYear: string
    prevMonth: () => void
    todayHandler: () => void
    nextMonth: () => void
}

export const CalendarHeader: React.FC<Props> = ({
                                                currentMonth, 
                                                currentYear, 
                                                prevMonth,
                                                todayHandler, 
                                                nextMonth
                                            }) => {
    return (
        <Wrapper>
            <DateNavigation>
                <CurrentDate currentMonth={currentMonth} currentYear={currentYear} />
                <div>
                    <Button onClick={prevMonth}>&lt;</Button>
                    <Button onClick={todayHandler}>Today</Button>
                    <Button onClick={nextMonth}>&gt;</Button>                 
                </div>
            </DateNavigation>
        </Wrapper>
    )
}

