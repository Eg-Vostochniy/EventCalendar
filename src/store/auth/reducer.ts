import { IUser } from './../../models/IUser';
import { SET_IS_AUTH, SET_USERS, SET_OWNER } from './types';
import { authActions } from './actions';
import { ReturnActionsTypes } from './../index'

let initialState = {
    isAuth: false,
    users: [] as IUser[],
    owner: {} as IUser
}

type InitialState = typeof initialState
type ActionType = ReturnActionsTypes<typeof authActions>

export const authReducer = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case SET_IS_AUTH: 
            return {...state, isAuth: action.payload}
        case SET_USERS:
            return {...state, users: [...action.payload]}
        case SET_OWNER:
            return {...state, owner: {...action.payload}}

        default: return state
    }
}
