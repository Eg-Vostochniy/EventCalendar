import { SET_CURRENT_DATE, SET_CURRENT_EVENT, SET_EVENTS, SET_IS_FETCHING, SET_IS_MODAL_EVENT, SET_IS_MODAL_EVENTS_ADDER, SET_NEW_EVENT } from './types'
import { calendarActions } from './actions'
import { ReturnActionsTypes } from './../index'
import { IEvent } from './../../models/IEvent'

let initialState = {
    events: [] as IEvent[],
    isModalEventsAdder: false,
    isModalEvent: false,
    currentDate: '',
    currentEvent: {} as IEvent,
    isFetching: false
}

type InitialState = typeof initialState
export type CalendarActionType = ReturnActionsTypes<typeof calendarActions>

export const calendarReducer = (state = initialState, action: CalendarActionType): InitialState => {
    switch (action.type) {
        case SET_EVENTS: 
            return {...state, events: action.payload}
        case SET_IS_MODAL_EVENTS_ADDER:
            return {...state, isModalEventsAdder: action.payload}
        case SET_IS_MODAL_EVENT:
            return {...state, isModalEvent: action.payload}
        case SET_CURRENT_DATE:
            return {...state, currentDate: action.payload}
        case SET_NEW_EVENT:
            return {...state, events: [...state.events, action.payload]}
        case SET_CURRENT_EVENT:
            return {...state, currentEvent: action.payload}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.payload}
            
        default: return state
    }
}
