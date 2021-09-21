import { authActions, authThunks } from './auth/actions'
import { calendarActions, calendarThunks } from './calendar/actions'

export const allActions = {
    ...calendarActions,
    ...calendarThunks,
    ...authActions,
    ...authThunks
}