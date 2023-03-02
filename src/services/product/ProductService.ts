import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductServiceCallbackMap } from './ProductServiceCallbackMap';

import GenericMiddleware from '../../middleware/GenericMiddleware';
import { EventParser } from '../../eventparse/EventParser';

const productService = async (event: APIGatewayProxyEvent): Promise<any> => {
    const callbackMap = new ProductServiceCallbackMap();
    const serviceDescriptor = EventParser.toServiceDescriptor(event);
    const responseBody = await callbackMap.processEvent(
        serviceDescriptor,
        event
    );
    return {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };
};

export const handler = GenericMiddleware(productService);
