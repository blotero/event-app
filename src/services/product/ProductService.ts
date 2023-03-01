import { APIGatewayProxyEvent } from 'aws-lambda';
import Middleware from '../../middleware/Middleware';

interface ProductServiceResponse {}

const productService = async (
    event: APIGatewayProxyEvent
): Promise<ProductServiceResponse> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'This is the product service!',
        }),
    };
};

export const handler = Middleware(productService);
