import { AppDispatch } from './../index';
import { eventsApi } from './../../api/eventsServices';
import { IEvent } from "../../models/IEvent";
import { SET_EVENTS } from "./types";

export const calendarActions = {
    setEvents: (payload: IEvent[]) => {return {type: SET_EVENTS, payload} as const}
}

export const calendarThunks = {
    fetchEvents: (username: string | null) => async (dispatch: AppDispatch) => {
        try {
            const response = await eventsApi.getCurrentMonthEvents(username)
            dispatch(calendarActions.setEvents(response))
        } catch(e: any) {
            console.log(e)
        }
    }
}