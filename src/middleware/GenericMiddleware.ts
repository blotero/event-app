import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent } from 'aws-lambda';

export default (handler: (event: APIGatewayProxyEvent) => {}) =>
    middy(handler as any).use([
        httpErrorHandler(),
        httpEventNormalizer(),
        jsonBodyParser(),
    ]);
