export interface IQuestion {
    qnbr: number
    effdt: string
    status: string
    descr: string
    video?: string | null
    orderby: number
    type: string
    object: string
    bobject?: string | null
}