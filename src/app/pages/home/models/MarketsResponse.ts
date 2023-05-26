export interface MarketResponse {
    id: number
    name: string
    date: Date
    userId: number
}

export type MarketNoUserId = Pick<MarketResponse, 'id' | 'name' | 'date'>