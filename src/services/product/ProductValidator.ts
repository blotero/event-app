import createHttpError from 'http-errors';
import { Validator } from '../../business/Validator';
import { GetProductRequest } from './ProductServiceParams';

export class GetProductServiceValidator implements Validator {
    validate(item: GetProductRequest): boolean {
        if (!item.productId)
            throw createHttpError.BadRequest(
                `A productId is required in path parameters`
            );
        return true;
    }
}
