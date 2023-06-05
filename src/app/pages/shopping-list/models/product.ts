export interface ProductResponse {
    id: number
    name: string
    price: number
    providerId: number
    creationDate: Date
}

export type ProductNoDate = Pick<ProductResponse, 'id' | 'name' | 'price' | 'providerId'>
export interface MarketProductNoDate extends ProductNoDate{
    marketProductId: number
    state: "purchased" | "listed"
}

export interface Products {
    listedProducts : MarketProductNoDate[]
    purchasedProducts: MarketProductNoDate[]
}