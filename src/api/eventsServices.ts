import { IEvent } from './../models/IEvent'

export const eventsApi = {
    getCurrentUserEvents: async (username: string | null): Promise<IEvent[]> => {
        return await (await fetch(`/api/events/${username}`)).json()
    },
    addNewEvent: async (event: IEvent) => {
        return await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
    },
    deleteEvent: async (id: number, deleter: string | null) => {
        return await fetch(`/api/events/${id}/${deleter}`, {
            method: 'DELETE'
        })
    }
}