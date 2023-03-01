import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';

export default (handler: any) =>
    middy(handler).use([
        httpErrorHandler(),
        httpEventNormalizer(),
        jsonBodyParser(),
    ]);
