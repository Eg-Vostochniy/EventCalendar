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
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        const response = await authAPI.login(username, password)
        dispatch(authActions.setIsAuth(response))
    },
    logout: () => (dispatch: AppDispatch) => {
        dispatch(authActions.setOwner({username: '', password: ''}))
        dispatch(authActions.setIsAuth(false))
    }
}