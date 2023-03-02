import { APIGatewayProxyEvent } from 'aws-lambda';
import createHttpError from 'http-errors';

export interface ServiceDescriptor {
    path: string;
    httpMethod: string;
}

export class ServiceCallbackMap {
    protected methodsMap: Map<
        ServiceDescriptor,
        (event: APIGatewayProxyEvent) => Promise<any>
    >;
    constructor() {
        this.methodsMap = new Map<
            ServiceDescriptor,
            (event: APIGatewayProxyEvent) => Promise<any>
        >();
    }
    async processEvent(
        serviceDescriptor: ServiceDescriptor,
        event: APIGatewayProxyEvent
    ) {
        const entries = Array.from(this.methodsMap.entries());

        for (const [serviceKey, processor] of entries) {
            if (
                serviceKey.httpMethod === serviceDescriptor.httpMethod &&
                serviceKey.path === serviceDescriptor.path
            ) {
                return processor(event);
            }
        }
        throw createHttpError.BadRequest(
            'Your input did not acomplished with any of the requirements'
        );
    }
}
