import { calendarActions } from './../calendar/actions';
import { authAPI } from './../../api/authServices';
import { userAPI } from './../../api/userService';
import { SET_IS_AUTH, SET_USERS, SET_OWNER } from './types';
import { IUser } from './../../models/IUser';
import { AppDispatch } from './../index';

export const authActions = {
    setIsAuth: (payload: boolean) => {return {type: SET_IS_AUTH, payload} as const},
    setUsers: (payload: IUser[]) => {return {type: SET_USERS, payload} as const},
    setOwner: (payload: IUser) => {return {type: SET_OWNER, payload} as const}
}

export const authThunks = {
    fetchUsers: () => async (dispatch: AppDispatch) => {
        const response = await userAPI.getUsers()
        dispatch(authActions.setUsers(response))
    },
    login: (username: string | null, password: string | null) => async (dispatch: AppDispatch) => {
        try {
        const response = await authAPI.login(username, password)
        sessionStorage.setItem('auth', 'true')
        sessionStorage.setItem('username', `${username}`)
        sessionStorage.setItem('password', `${password}`)
        dispatch(authActions.setOwner({username, password}))
        dispatch(authActions.setIsAuth(response))
        } catch(e: any) {
            console.log(e)
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            const response = await authAPI.login(null, null)
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('password')
            dispatch(authActions.setOwner({username: '', password: ''}))
            dispatch(calendarActions.setEvents([]))
            dispatch(authActions.setIsAuth(response))
        } catch(e: any) {
            console.log(e)
        }
    }
}