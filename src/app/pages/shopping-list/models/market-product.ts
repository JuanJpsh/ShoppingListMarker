import { ProductResponse } from "./product"

export interface MarketProductJoin {
    id: number
    marketId: number
    productId: number
    product: ProductResponse
    state: "purchased" | "listed"
}

export type MarketProduct = Pick<MarketProductJoin, 'id' | 'marketId' | 'productId' | 'state'>
export type MarketProductToSave = Pick<MarketProductJoin, 'marketId' | 'productId' | 'state'>