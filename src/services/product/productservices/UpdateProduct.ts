import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductRepository } from '../ProductRepository';
import { UpdateProductResponse } from '../ProductServiceParams';
import { UpdateProductServiceValidator } from '../ProductValidator';

export const UpdateProduct = async (
    event: APIGatewayProxyEvent
): Promise<UpdateProductResponse> => {
    const { pathParameters } = event;
    const { productId } = pathParameters as any;

    new UpdateProductServiceValidator().validate(event);
    return new ProductRepository().update(productId);
};
