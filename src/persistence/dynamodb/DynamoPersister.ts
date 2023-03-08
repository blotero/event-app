import { Persister } from '../Persister';
import { ServiceTable } from '../ServiceTable';

import AWS from 'aws-sdk';
import { DynamoDbTableMap } from './TableMap';
import { Key } from 'aws-sdk/clients/dynamodb';
import { Entity } from '../../business/entity/Entity';
import { DynamoElementsBuilder } from './DynamoElementsBuilder';
const dynamo = new AWS.DynamoDB.DocumentClient();

export class DynamoPersister implements Persister {
    #tableName: string;
    constructor(table: ServiceTable) {
        this.#tableName = DynamoDbTableMap.get(table) as string;
    }
    async create(item: Entity) {
        const params = {
            Item: item as any,
            TableName: this.#tableName,
        };
        return dynamo
            .put(params)
            .promise()
            .catch((err) => {
                throw err;
            });
    }
    async read(id: string) {
        const params = {
            Key: { id } as Key,
            TableName: this.#tableName,
        };
        return dynamo
            .get(params)
            .promise()
            .catch((err) => {
                throw err;
            });
    }
    async update(id: Entity, updateObject?: any, deleteObject?: any) {
        const params = {
            Key: { id } as Key,
            TableName: this.#tableName,
            UpdateExpression: DynamoElementsBuilder.buildUpdateExpression({
                updateObject,
                deleteObject,
            }),
            ExpressionAttributeValues: updateObject
                ? DynamoElementsBuilder.buildExpressionAttributesFromObject(
                      updateObject
                  )
                : undefined,
        };
        return dynamo
            .update(params)
            .promise()
            .catch((err) => {
                throw err;
            });
    }
    async delete(id: string) {
        const params = {
            Key: { id } as Key,
            TableName: this.#tableName,
        };
        return dynamo
            .delete(params)
            .promise()
            .catch((err) => {
                throw err;
            });
    }
}
