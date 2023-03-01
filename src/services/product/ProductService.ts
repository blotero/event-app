import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiHttpMethod } from '../../business/ServiceCallbackMap';
import Middleware from '../../middleware/Middleware';
import { ProductServiceCallbackMap } from './ProductServiceCallbackMap';

interface ProductServiceResponseBody {}

const productService = async (
    event: APIGatewayProxyEvent
): Promise<ProductServiceResponseBody> => {
    console.log('Product service!');
    const callbackMap = new ProductServiceCallbackMap();
    const responseBody = await callbackMap.processEvent(
        {
            method: ApiHttpMethod.get,
            path: '/product',
        },
        event
    );

    return {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };
};

export const handler = Middleware(productService);
