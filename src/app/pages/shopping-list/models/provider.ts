export interface Provider {
    creationDate: Date;
    id: number;
    name: string;
}

export type ProviderNoDate = Pick<Provider, 'id' | 'name' >