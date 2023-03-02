import { ServiceCallbackMap } from '../../business/ServiceCallbackMap';
import { GetProduct } from './GetProduct';

export class ProductServiceCallbackMap extends ServiceCallbackMap {
    constructor() {
        super();
        this.methodsMap.set(
            {
                path: '/product',
                httpMethod: 'get',
            },
            GetProduct
        );
    }
}
