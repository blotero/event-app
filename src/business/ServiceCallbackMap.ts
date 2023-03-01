import { APIGatewayProxyEvent } from 'aws-lambda';

export enum ApiHttpMethod {
    get,
    put,
    post,
    delete,
    patch,
}

export interface ServiceDescriptor {
    path: string;
    method: ApiHttpMethod;
}

export class ServiceCallbackMap {
    protected data: Map<ServiceDescriptor, (event: APIGatewayProxyEvent) => {}>;
    constructor() {
        this.data = new Map<
            ServiceDescriptor,
            (event: APIGatewayProxyEvent) => {}
        >();
    }
    async processEvent(
        serviceDescriptor: ServiceDescriptor,
        event: APIGatewayProxyEvent
    ) {
        const processor = this.data.get(serviceDescriptor) as (
            event: APIGatewayProxyEvent
        ) => {};
        return processor(event);
    }
}
