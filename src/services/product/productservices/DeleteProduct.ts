import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductRepository } from '../ProductRepository';
import { DeleteProductResponse } from '../ProductServiceParams';
import { DeleteProductServiceValidator } from '../ProductValidator';

export const DeleteProduct = async (
    event: APIGatewayProxyEvent
): Promise<DeleteProductResponse> => {
    const { pathParameters } = event;
    const { productId } = pathParameters as any;

    new DeleteProductServiceValidator().validate(event);
    return new ProductRepository().delete(productId);
};
