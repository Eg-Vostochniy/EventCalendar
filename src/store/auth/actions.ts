import { calendarActions } from './../calendar/actions';
import { authAPI } from './../../api/authServices';
import { userAPI } from './../../api/userService';
import { SET_IS_AUTH, SET_USERS, SET_OWNER, SET_IS_FETCHING } from './types';
import { IUser } from './../../models/IUser';
import { AppDispatch, ThunkType } from './../index';
import { AuthActionType } from './reducer';

export const authActions = {
    setIsAuth: (payload: boolean) => {return {type: SET_IS_AUTH, payload} as const},
    setUsers: (payload: IUser[]) => {return {type: SET_USERS, payload} as const},
    setOwner: (payload: {username: string | null, password: string | null}) => {return {type: SET_OWNER, payload} as const},
    setIsFetching: (payload: boolean) => {return {type: SET_IS_FETCHING, payload} as const}
}

export const authThunks = {
    fetchUsers: (): ThunkType<AuthActionType> => async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsFetching(true))
            const response = await userAPI.getUsers()
            dispatch(authActions.setUsers(response))
            dispatch(authActions.setIsFetching(false))
        } catch(e: any) {
            console.log(e)
        }
    },
    login: (username: string | null, password: string | null): ThunkType<AuthActionType> => async (dispatch) => {
        try {
            dispatch(authActions.setIsFetching(true))
            const response = await authAPI.login(username, password)
            sessionStorage.setItem('auth', 'true')
            sessionStorage.setItem('username', `${username}`)
            sessionStorage.setItem('password', `${password}`)
            dispatch(authActions.setOwner({username, password}))
            dispatch(authActions.setIsAuth(response))
            dispatch(authActions.setIsFetching(false))
        } catch(e: any) {
            console.log(e)
        }
    },
    logout: (): ThunkType<AuthActionType> => async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setIsFetching(true))
            const response = await authAPI.login('', '')
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('password')
            dispatch(authActions.setOwner({username: '', password: ''}))
            dispatch(calendarActions.setEvents([]))
            dispatch(authActions.setIsAuth(response))
            dispatch(authActions.setIsFetching(false))
        } catch(e: any) {
            console.log(e)
        }
    }
}