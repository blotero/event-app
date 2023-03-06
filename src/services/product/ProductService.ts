import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductServiceCallbackMap } from './ProductServiceCallbackMap';

import GenericMiddleware from '../../middleware/GenericMiddleware';
import { EventParser } from '../../eventparse/EventParser';
import { ProxyResponse } from '../../http/Response';

const productService = async (event: APIGatewayProxyEvent): Promise<any> => {
    const callbackMap = new ProductServiceCallbackMap();
    const serviceDescriptor = EventParser.toServiceDescriptor(event);
    const response = await callbackMap.processEvent(serviceDescriptor, event);
    return new ProxyResponse(response).build();
};

export const handler = GenericMiddleware(productService);
