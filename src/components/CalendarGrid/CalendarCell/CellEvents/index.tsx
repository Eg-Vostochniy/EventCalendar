import { memo } from 'react'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'

export const CellEvent: React.FC<{eventTitle: string}> = memo(({eventTitle}) => {
    const {setIsModal} = useAppDispatch()
    return (
        <div onClick={() => setIsModal(true)}>
            {eventTitle}
        </div>
    )
})
