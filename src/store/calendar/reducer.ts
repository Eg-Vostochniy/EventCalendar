import { SET_CURRENT_DATE, SET_EVENTS, SET_IS_MODAL } from './types';
import { calendarActions } from './actions';
import { ReturnActionsTypes } from './../index';
import { IEvent } from './../../models/IEvent';

let initialState = {
    events: [] as IEvent[],
    isModal: false,
    currentDate: ''
}

type InitialState = typeof initialState
type ActionType = ReturnActionsTypes<typeof calendarActions>

export const calendarReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case SET_EVENTS: 
            return {...state, events: [...action.payload]}
        case SET_IS_MODAL:
            return {...state, isModal: action.payload}
        case SET_CURRENT_DATE:
            return {...state, currentDate: action.payload}       
    
        default: return state
    }
}
