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

export class ServiceDescriptorCallback {
    protected data: Map<ServiceDescriptor, (event: APIGatewayProxyEvent) => {}>;
    constructor() {
        this.data = new Map<
            ServiceDescriptor,
            (event: APIGatewayProxyEvent) => {}
        >();
    }
}
