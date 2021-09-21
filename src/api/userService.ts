import { IUser } from "../models/IUser"

export const userAPI = {
    getUsers: async (): Promise<IUser[]> => {
        return await (await fetch(`/api/users`)).json()
    }
}
