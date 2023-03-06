import { APIGatewayProxyEvent } from 'aws-lambda';
import { ServiceDescriptor } from '../business/ServiceCallbackMap';

export class EventParser {
    public static toServiceDescriptor(
        event: APIGatewayProxyEvent
    ): ServiceDescriptor {
        const { routeKey } = event as any;

        const splitted: string[] = routeKey.split(' ');

        return {
            path: splitted[1],
            httpMethod: splitted[0].toLowerCase(),
        };
    }
}
