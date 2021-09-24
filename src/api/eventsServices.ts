import { IEvent } from './../models/IEvent'

export const eventsApi = {
    getCurrentMonthEvents: async (username: string | null): Promise<IEvent[]> => {
        return await (await fetch(`/api/events/${username}`)).json()
    },
    addNewEvent: async (event: IEvent) => {
        console.log(event)
        await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
    }
}