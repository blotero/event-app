import { APIGatewayProxyEvent } from 'aws-lambda';
import { ServiceDescriptor } from '../business/ServiceCallbackMap';

export class EventParser {
    public static toServiceDescriptor(
        event: APIGatewayProxyEvent
    ): ServiceDescriptor {
        const { httpMethod, path } = event;
        return {
            path,
            httpMethod,
        };
    }
}
