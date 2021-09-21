import { IEvent } from './../models/IEvent'

export const eventsApi = {
    getCurrentMonthEvents: async (from: string, to: string, username: string): Promise<IEvent[]> => {
        return await (await fetch(`/api/events/${from}/${to}/${username}`)).json()
    }
}