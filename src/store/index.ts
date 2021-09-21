import { authReducer } from './auth/reducer';
import { calendarReducer } from './calendar/reducer';
import { createStore } from 'redux'
import { Action, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
    calendarReducer,
    authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type ReturnActionsTypes<T> = T extends {[key: string]: (...args: any) => infer U} ? U : never 
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>