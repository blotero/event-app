export interface GetProductResponse {
    name: string;
    id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    launchDate: Date;
    launchedBy: string;
    partialBuyers: number;
    fullBuyers: number;
}

export interface GetProductRequest {
    productId: string;
}
