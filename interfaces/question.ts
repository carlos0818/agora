export interface IQuestion {
    correlative: number
    qnbr: number
    effdt: string
    status: string
    descr: string
    video?: string | null
    orderby: number
    type: string
    object: string
    bobject?: string | null
    page: number
}