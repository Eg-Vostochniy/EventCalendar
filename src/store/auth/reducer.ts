import { IUser } from './../../models/IUser'
import { SET_IS_AUTH, SET_USERS, SET_OWNER } from './types'
import { authActions } from './actions'
import { ReturnActionsTypes } from './../index'

let initialState = {
    isAuth: false,
    users: [] as IUser[],
    owner: {} as {username: string | null, password: string | null}
}

type InitialState = typeof initialState
export type AuthActionType = ReturnActionsTypes<typeof authActions>

export const authReducer = (state = initialState, action: AuthActionType): InitialState => {
    switch (action.type) {
        case SET_IS_AUTH: 
            return {...state, isAuth: action.payload}
        case SET_USERS:
            return {...state, users: action.payload}
        case SET_OWNER:
            return {...state, owner: action.payload}

        default: return state
    }
}
