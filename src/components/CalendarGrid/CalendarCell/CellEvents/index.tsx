import { memo, useState } from 'react'
import { IEvent } from '../../../../models/IEvent'

export const CellEvent: React.FC<{event: IEvent}> = memo(({event}) => {
    const [isModal, setIsModal] = useState(false)
    return (
        <div onClick={() => setIsModal(true)}>
            {
                isModal ? <div>
                    <div>evit</div>
                    {event.description}
                </div>: null
            }
            {event.title}
        </div>
    )
})
/* const Modal: React.FC<{description: string, unSetModal: () => void}> = ({description, unSetModal}) => {
    return (
        <div>
            <span onClick={unSetModal}>evit</span>
            {description}
        </div>
    )
} */