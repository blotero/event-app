import { Crud } from '../../business/Crud';
import {
    CreateProductResponse,
    DeleteProductResponse,
    GetProductResponse,
    UpdateProductResponse,
} from './ProductServiceParams';

export class ProductRepository implements Crud {
    async create(item: any): Promise<CreateProductResponse> {
        return {
            statusCode: 201,
            body: {
                message: 'Succesfully created product',
            },
        };
    }
    async read(item: any): Promise<GetProductResponse> {
        return {
            statusCode: 200,
            body: {
                description: 'Simple product',
                endDate: new Date(),
                fullBuyers: 10,
                id: 'product1',
                launchDate: new Date(),
                launchedBy: 'brandon.lotero',
                name: 'Product 1',
                partialBuyers: 15,
                startDate: new Date(),
            },
        };
    }
    async update(item: any): Promise<UpdateProductResponse> {
        return {
            statusCode: 201,
            body: {
                message: 'Succesfully created product',
            },
        };
    }
    async delete(item: any): Promise<DeleteProductResponse> {
        return {
            statusCode: 201,
            body: {
                message: 'Succesfully created product',
            },
        };
    }
}
