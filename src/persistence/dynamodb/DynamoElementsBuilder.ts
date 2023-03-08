type UpdatableAttributeValue = { [key: string]: string | number | boolean };
export interface BuilderInput {
    updateObject?: UpdatableAttributeValue;
    deleteObject?: string[];
}
export class DynamoElementsBuilder {
    private static buildDeleteExpression(keys: string[]) {
        let output = 'REMOVE';
        for (const key of keys) {
            output = `${output} ${key},`;
        }
        return output;
    }

    public static buildUpdateExpression({
        updateObject,
        deleteObject,
    }: BuilderInput) {
        let output = '';
        if (updateObject) {
            const keys = Object.keys(updateObject);
            output += 'SET';
            for (const key of keys) {
                output = `${output} ${key} = :${key},`;
            }
        }

        if (deleteObject) {
            output += DynamoElementsBuilder.buildDeleteExpression(deleteObject);
        }

        return output.slice(0, -1);
    }

    public static buildExpressionAttributesFromObject(
        object: UpdatableAttributeValue
    ) {
        const entries = Object.entries(object);
        const output: { [key: string]: string | number | boolean } = {};
        for (const [key, value] of entries) {
            output[`:${key}`] = value;
        }
        return output;
    }
}
