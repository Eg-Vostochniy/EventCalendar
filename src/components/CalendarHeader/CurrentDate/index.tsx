import { memo } from "react"

export const CurrentMonth: React.FC<{currentMonth: string}> = memo(({currentMonth}) => {
    return <span style={{paddingRight: '5.5px'}}>{currentMonth}</span>
})
export const CurrentYear: React.FC<{currentYear: string}> = memo(({currentYear}) => {
    return <span>{currentYear}</span>
})


