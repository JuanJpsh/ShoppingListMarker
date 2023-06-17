import { Provider } from "./provider"

export interface ProductJoinResponse {
    id: number
    name: string
    price: number
    provider: Provider
    creationDate: Date
}

export interface ProductResponse {
    id: number
    name: string
    price: number
    providerId: number
    creationDate: Date
}

export interface ProductNoDate extends Pick<ProductJoinResponse, 'id' | 'name' | 'price'> {
    providerName: string
}
export interface MarketProductNoDate extends ProductNoDate {
    marketProductId: number
    state: "purchased" | "listed"
}

export interface Products {
    listedProducts: MarketProductNoDate[]
    purchasedProducts: MarketProductNoDate[]
}

export interface marketProductToUpdate {
    marketProduct: MarketProductNoDate
    lastProductId: number
}