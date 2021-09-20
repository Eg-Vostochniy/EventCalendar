import { Login } from '../pages/Login';
import { Calendar } from './../pages/Calendar';

export interface IRoute {
    path: string
    component: React.ComponentType
    exact?: boolean
}
export enum Path {
    LOGIN = '/login',
    CALENDAR = '/'
}

export const publicRoute: IRoute[] = [
    {path: Path.LOGIN, component: Login, exact: true}
]

export const privateRoute: IRoute[] = [
    {path: Path.CALENDAR, component: Calendar, exact: true}
]
