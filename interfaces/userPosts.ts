export interface IUserPosts {
    post:     IPost
    comments: IPost[]
    like:     boolean
}

export interface IPost {
    index:        number
    type?:        string
    companyName?: string
    fullname?:    string
    userId?:      string
    profilepic?:  string
    body:         string
    dateposted?:  string
    likes?:       number
    indexparent?: number | null
    like?:        boolean
    server?:       boolean | null
}
