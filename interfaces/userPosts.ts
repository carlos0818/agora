// export interface IUserPosts {
//     index: number
//     type?: string
//     companyName: string
//     fullname: string
//     profilepic: string
//     body: string
//     dateposted: string
//     likes: number
// }

export interface IUserPosts {
    post:     Post;
    comments: Post[];
}

export interface Post {
    index:       number;
    type:        string;
    companyName: string;
    fullname:    string;
    profilepic:  string;
    body:        string;
    dateposted:  string;
    likes:       number;
    indexparent: number | null;
}
