export interface IUserPosts {
    post:     IPost
    comments: IPost[]
}

export interface IPost {
    index:        number
    type?:        string
    companyName?: string
    fullname?:    string
    profilepic?:  string
    body:         string
    dateposted?:  string
    likes?:       number
    indexparent?: number | null
}
