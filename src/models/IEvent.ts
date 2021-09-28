export interface IEvent {
    id?: number
    creator: string | null
    title: string
    description: string
    date: string
    guests: string[]
}