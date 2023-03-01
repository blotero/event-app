import {
    ApiHttpMethod,
    ServiceCallbackMap,
} from '../../business/ServiceCallbackMap';
import { GetProduct } from './GetProduct';

export class ProductServiceCallbackMap extends ServiceCallbackMap {
    constructor() {
        super();
        this.data.set(
            {
                method: ApiHttpMethod.get,
                path: '/product',
            },
            GetProduct
        );
    }
}
