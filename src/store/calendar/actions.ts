import { AppDispatch } from './../index';
import { eventsApi } from './../../api/eventsServices';
import { IEvent } from "../../models/IEvent";
import { SET_EVENTS } from "./types";

export const calendarActions = {
    setEvents: (payload: IEvent[]) => {return {type: SET_EVENTS, payload} as const}
}

export const calendarThunks = {
    fetchEvents: (fromDate: string, toDate: string, username: string) => async (dispatch: AppDispatch) => {
        const response = await eventsApi.getCurrentMonthEvents(fromDate, toDate, username)
        dispatch(calendarActions.setEvents(response))
    }
}