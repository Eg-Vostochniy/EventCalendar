import { SET_EVENTS } from './types';
import { calendarActions } from './actions';
import { ReturnActionsTypes } from './../index';
import { IEvent } from './../../models/IEvent';

let initialState = {
    events: [] as IEvent[],
    isModal: false
}

type InitialState = typeof initialState
type ActionType = ReturnActionsTypes<typeof calendarActions>

export const calendarReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case SET_EVENTS: 
            return {...state, events: action.payload}       
    
        default: return state
    }
}
