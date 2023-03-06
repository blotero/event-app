import { ServiceCallbackMap } from '../../business/ServiceCallbackMap';
import { CreateProduct } from './productservices/CreateProduct';
import { DeleteProduct } from './productservices/DeleteProduct';
import { GetProduct } from './productservices/GetProduct';
import { UpdateProduct } from './productservices/UpdateProduct';

export class ProductServiceCallbackMap extends ServiceCallbackMap {
    constructor() {
        super();
        this.methodsMap.set(
            {
                path: '/product/{productId}',
                httpMethod: 'get',
            },
            GetProduct
        );
        this.methodsMap.set(
            {
                path: '/product/{productId}',
                httpMethod: 'delete',
            },
            DeleteProduct
        );
        this.methodsMap.set(
            {
                path: '/product',
                httpMethod: 'post',
            },
            CreateProduct
        );
        this.methodsMap.set(
            {
                path: '/product/{productId}',
                httpMethod: 'put',
            },
            UpdateProduct
        );
    }
}
