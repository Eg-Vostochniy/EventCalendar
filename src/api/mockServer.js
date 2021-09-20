import { createServer } from "miragejs"

const __users = [
    { id: 1, username: "user", password: '123' },
    { id: 2, username: "user1", password: '123' },
    { id: 3, username: "user2", password: '123' },
    { id: 4, username: "user3", password: '123' },
    { id: 5, username: "user4", password: '123' },
    { id: 6, username: "user5", password: '123' },
    { id: 7, username: "user6", password: '123' },
    { id: 8, username: "user7", password: '123' },
    { id: 9, username: "user8", password: '123' },
    { id: 10, username: "user9", password: '123' },
    { id: 11, username: "user10", password: '123' },
    { id: 12, username: "user11", password: '123' },
    { id: 13, username: "user12", password: '123' },
    { id: 14, username: "user13", password: '123' },
    { id: 15, username: "user14", password: '123' },
    { id: 16, username: "user15", password: '123' },
    { id: 17, username: "user16", password: '123' },
    { id: 18, username: "user17", password: '123' },
    { id: 19, username: "user18", password: '123' },
    { id: 20, username: "user19", password: '123' },
    { id: 21, username: "user20", password: '123' },
    { id: 22, username: "user21", password: '123' },
    { id: 23, username: "user22", password: '123' },
    { id: 24, username: "user23", password: '123' },
    { id: 25, username: "user24", password: '123' },
    { id: 26, username: "user25", password: '123' }
]
const users = [
    { id: 1, username: "user"},
    { id: 2, username: "user1"},
    { id: 3, username: "user2"},
    { id: 4, username: "user3"},
    { id: 5, username: "user4"},
    { id: 6, username: "user5"},
    { id: 7, username: "user6"},
    { id: 8, username: "user7"},
    { id: 9, username: "user8"},
    { id: 10, username: "user9"},
    { id: 11, username: "user10"},
    { id: 12, username: "user11"},
    { id: 13, username: "user12"},
    { id: 14, username: "user13"},
    { id: 15, username: "user14"},
    { id: 16, username: "user15"},
    { id: 17, username: "user16"},
    { id: 18, username: "user17"},
    { id: 19, username: "user18"},
    { id: 20, username: "user19"},
    { id: 21, username: "user20"},
    { id: 22, username: "user21"},
    { id: 23, username: "user22"},
    { id: 24, username: "user23"},
    { id: 25, username: "user24"},
    { id: 26, username: "user25"}
]

createServer({
    routes() {
        this.namespace = "api"    
        this.get("/users", () => ({
            users: users
        }))
        this.post('/login', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            if(attrs){
                const user = __users.find(user => user.username === attrs.username && 
                                    user.password === attrs.password)
                if(user) return true
                return false                   
            }
        })
    }
})