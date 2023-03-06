import createHttpError from 'http-errors';
import { Validator } from '../../business/Validator';

export class GetProductServiceValidator implements Validator {
    validate(event: any): boolean {
        const { pathParameters } = event;
        if (!pathParameters)
            throw createHttpError.BadRequest(
                'A path parameter is required for retrieving event'
            );

        if (!pathParameters.productId)
            throw createHttpError.BadRequest(
                `A productId is required in path parameters.`
            );

        return true;
    }
}

export class CreateProductServiceValidator implements Validator {
    validate(event: any): boolean {
        const { body } = event;
        if (!body)
            throw new createHttpError.BadRequest(
                'A body is required for creating a new product'
            );

        if (!body.productId)
            throw new createHttpError.BadRequest(
                'A product id is required in body'
            );

        return true;
    }
}

export class DeleteProductServiceValidator implements Validator {
    validate(event: any): boolean {
        return new GetProductServiceValidator().validate(event);
    }
}

export class UpdateProductServiceValidator implements Validator {
    validate(event: any): boolean {
        return new GetProductServiceValidator().validate(event);
    }
}
