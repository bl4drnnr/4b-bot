export interface IAlarm {
    id?: string
    userId: string
    pair: string
    triggerPrice: number
    indexPrice: number
    createdAt?: string
}