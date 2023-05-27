export interface MarketResponse {
    id: number
    name: string
    date: Date
    userId: number
}

export type MarketNoUserId = Pick<MarketResponse, 'id' | 'name' | 'date'>

export type MarketClick = Pick<MarketResponse, 'id' | 'name'>

export type MarketToSave = Pick<MarketResponse, 'name' | 'date' | 'userId'>