export interface IComment {
    index: number
    type: string
    companyName: string
    fullname: string
    profilepic: string
    body: string
    dateAdded: string
    email?: string
    id?: string
    server?: boolean | null
}