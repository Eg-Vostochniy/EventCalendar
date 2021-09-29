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
const events = [
    {id: 0, creator: 'user1', title: 'Evnt', description: 'fdsfdsfsffsdf', date: '09-29-2021', guests: ['user']},
    {id: 1, creator: 'user1', title: 'dfg', description: 'fdsfasdasddsfsffsdf', date: '08-15-2021', guests: ['user11', 'user20', 'user14']},
    {id: 2, creator: 'user1', title: 'Klds', description: 'fdsfdsfasdsffsdf', date: '08-30-2021', guests: ['user9', 'user17']},
    {id: 3, creator: 'user1', title: 'Forus', description: 'fdsfdsfasdsffsdf', date: '09-03-2021', guests: ['user20', 'user10']},
    {id: 4, creator: 'user1', title: 'hrlo', description: 'fdsfdsfasdsffsdf', date: '09-22-2021', guests: ['user5', 'user24']},
    {id: 5, creator: 'user1', title: 'bodmy', description: 'fdsfdsfasdsffsdf', date: '09-29-2021', guests: ['user5', 'user24']},
    {id: 6, creator: 'user1', title: 'assrr', description: 'fdsfdsfasdsffsdf', date: '09-30-2021', guests: ['user5', 'user24']},
    {id: 7, creator: 'user1', title: 'lkgdjfkg', description: 'fdsfdsfasdsffsdf', date: '10-5-2021', guests: ['user5', 'user24']}
]

createServer({
    routes() {
        this.namespace = "api"    
        this.get('/users', () => users)
        this.post('/login', (_, request) => {
            let attrs = JSON.parse(request.requestBody)
            if(attrs){
                const user = __users.find(user => user.username === attrs.username && 
                                    user.password === attrs.password)
                if(user) return true
                return false                   
            }
        })
        this.get('/events/:username', (_, request) => {
            let {username} = request.params
            //from = events.find((f) => f.date <= from)
            //to = events.find((t) => t.date >= to)
            //let slicedEvents = events.slice(from.id, to.id + 1)
            let userEvents = events.filter((e) => {
                if(e.guests.find((h) => h === username) || e.creator === username){
                    return e
                }
                return null
            })
            return userEvents
        })
        this.post('/events', (_, request) => {
            let attrs = JSON.parse(request.requestBody)
            let id = events.length
            attrs && events.push(Object.assign(attrs, {id: id}))
        })
    }
})
