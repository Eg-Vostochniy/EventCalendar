import { IEvent } from './../../models/IEvent'
import { CalendarActionType } from './reducer'
import { ThunkType } from './../index'
import { eventsApi } from './../../api/eventsServices'
import { SET_CURRENT_DATE, SET_CURRENT_EVENT, SET_EVENTS, SET_IS_FETCHING, SET_IS_MODAL_EVENT, SET_IS_MODAL_EVENTS_ADDER, SET_NEW_EVENT } from "./types";

export const calendarActions = {
    setEvents: (payload: IEvent[]) => {return {type: SET_EVENTS, payload} as const},
    setIsModalEventsAdder: (payload: boolean) => {return {type: SET_IS_MODAL_EVENTS_ADDER, payload} as  const},
    setIsModalEvent: (payload: boolean) => {return {type: SET_IS_MODAL_EVENT, payload} as  const},
    setCurrentDate: (payload: string) => {return {type: SET_CURRENT_DATE, payload} as const},
    setNewEvent: (payload: IEvent) => {return {type: SET_NEW_EVENT, payload} as const},
    setCurrentEvent: (payload: IEvent) => {return {type: SET_CURRENT_EVENT, payload} as const},
    setIsFetching: (payload: boolean) => {return {type: SET_IS_FETCHING, payload} as const}
}

export const calendarThunks = {
    fetchEvents: (username: string | null): ThunkType<CalendarActionType> => async (dispatch) => {
        try {
            dispatch(calendarActions.setIsFetching(true))
            const response = await eventsApi.getCurrentUserEvents(username)
            dispatch(calendarActions.setEvents(response))
            dispatch(calendarActions.setIsFetching(false))
        } catch(e: any) {
            console.log(e)
        }
    },
    addNewEvent: (event: IEvent): ThunkType<CalendarActionType> => async (dispatch) => {
        try {
            dispatch(calendarActions.setIsFetching(true))
            const response = await eventsApi.addNewEvent(event)
            response.ok && dispatch(calendarActions.setNewEvent(event))
            dispatch(calendarActions.setIsFetching(false))
        } catch (e: any) {
            console.log(e)
        }
    },
    deleteEvent: (id: number, username: string | null): ThunkType<CalendarActionType> => async (dispatch) => {
        try {
            dispatch(calendarActions.setIsFetching(true))
            const response = await eventsApi.deleteEvent(id, username)
            response.ok && dispatch(calendarThunks.fetchEvents(username))
            dispatch(calendarActions.setIsFetching(false))
        } catch (e: any) {
            console.log(e)
        }
    }
}