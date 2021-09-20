type Props = {
    currentMonth: string
    currentYear: string
}

export const CurrentDate: React.FC<Props> = ({currentMonth, currentYear}) => {
    return <span>{currentMonth + ' ' + currentYear}</span>
}

