export const userAPI = {
    getUsers: async () => {
        return await (await fetch('/api/users')).json()
    }
}
