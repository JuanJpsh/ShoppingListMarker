export interface ProductResponse {
    id: number
    name: string
    price: number
    providerId: number
    creationDate: Date
}

export type ProductNoDate = Pick<ProductResponse, 'id' | 'name' | 'price' | 'providerId'>