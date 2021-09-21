export const authAPI = {
    login: async (username: string, password: string): Promise<boolean> => {
        return await (await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })).json()
    }
}