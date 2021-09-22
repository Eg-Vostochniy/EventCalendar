import { IEvent } from './../models/IEvent'

export const eventsApi = {
    getCurrentMonthEvents: async (username: string | null): Promise<IEvent[]> => {
        return await (await fetch(`/api/events/${username}`)).json()
    }
}