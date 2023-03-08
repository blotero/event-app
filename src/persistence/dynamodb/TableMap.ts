import { ServiceTable } from '../ServiceTable';

const { PRODUCT_TABLE } = process.env;

export const DynamoDbTableMap = new Map<ServiceTable, String>();

DynamoDbTableMap.set(ServiceTable.product, PRODUCT_TABLE as string);
