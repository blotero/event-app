export interface CreateProductResponse {
    statusCode: number;
    body: {
        message: string;
    };
}

export interface DeleteProductResponse {
    statusCode: number;
    body: {
        message: string;
    };
}

export interface UpdateProductResponse {
    statusCode: number;
    body: {
        message: string;
    };
}

export interface GetProductResponse {
    statusCode: number;
    body: {
        name: string;
        id: string;
        description: string;
        startDate: Date;
        endDate: Date;
        launchDate: Date;
        launchedBy: string;
        partialBuyers: number;
        fullBuyers: number;
    };
}

export interface GetProductRequest {
    productId: string;
}
