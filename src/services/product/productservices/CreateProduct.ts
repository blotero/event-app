import { APIGatewayProxyEvent } from 'aws-lambda';
import { ProductRepository } from '../ProductRepository';
import { CreateProductResponse } from '../ProductServiceParams';
import { CreateProductServiceValidator } from '../ProductValidator';

export const CreateProduct = async (
    event: APIGatewayProxyEvent
): Promise<CreateProductResponse> => {
    const { body } = event;
    const { productId } = body as any;

    new CreateProductServiceValidator().validate(event);
    return new ProductRepository().create(productId);
};
