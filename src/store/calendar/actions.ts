import { AppDispatch } from './../index';
import { eventsApi } from './../../api/eventsServices';
import { IEvent } from "../../models/IEvent";
import { SET_CURRENT_DATE, SET_EVENTS, SET_IS_MODAL } from "./types";

export const calendarActions = {
    setEvents: (payload: IEvent[]) => {return {type: SET_EVENTS, payload} as const},
    setIsModal: (payload: boolean) => {return {type: SET_IS_MODAL, payload} as  const},
    setCurrentDate: (payload: string) => {return {type: SET_CURRENT_DATE, payload} as const}
}

export const calendarThunks = {
    fetchEvents: (username: string | null) => async (dispatch: AppDispatch) => {
        try {
            const response = await eventsApi.getCurrentMonthEvents(username)
            dispatch(calendarActions.setEvents(response))
        } catch(e: any) {
            console.log(e)
        }
    },
    addNewEvent: (event: IEvent, username: string) => async () => {
        try {
            await eventsApi.addNewEvent(event)
            calendarThunks.fetchEvents(username)
        } catch (e: any) {
            console.log(e)
        }
    }
}