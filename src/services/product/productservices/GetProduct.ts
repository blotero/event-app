import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductRepository } from '../ProductRepository';
import { GetProductResponse } from '../ProductServiceParams';
import { GetProductServiceValidator } from '../ProductValidator';

export const GetProduct = async (
    event: APIGatewayProxyEvent
): Promise<GetProductResponse> => {
    const { pathParameters } = event;
    const { productId } = pathParameters as any;

    new GetProductServiceValidator().validate(event);
    return new ProductRepository().read(productId);
};
