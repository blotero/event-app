import { Crud } from '../../business/Crud';
import { GetProductResponse } from './ProductServiceParams';

export class ProductRepository implements Crud {
    async create(item: any) {
        throw new Error('Method not implemented.');
    }
    async read(item: any): Promise<GetProductResponse> {
        return {
            description: 'Simple product',
            endDate: new Date(),
            fullBuyers: 10,
            id: 'product1',
            launchDate: new Date(),
            launchedBy: 'brandon.lotero',
            name: 'Product 1',
            partialBuyers: 15,
            startDate: new Date(),
        };
    }
    async update(item: any) {
        throw new Error('Method not implemented.');
    }
    async delete(item: any) {
        throw new Error('Method not implemented.');
    }
}
