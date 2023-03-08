import { DynamoElementsBuilder } from '../src/persistence/dynamodb/DynamoElementsBuilder';
const updateObject = {
    name: 'Pedro',
    lastName: 'Paramo',
    birthDate: new Date().toISOString(),
};
const deleteObject = ['isRegistered', 'isNew'];

test('Building only update expression', () => {
    const updateExpression = DynamoElementsBuilder.buildUpdateExpression({
        updateObject,
    });

    expect(updateExpression).toBe(
        'SET name = :name, lastName = :lastName, birthDate = :birthDate'
    );
});
test('Building only delete expression', () => {
    const updateExpression = DynamoElementsBuilder.buildUpdateExpression({
        deleteObject,
    });

    expect(updateExpression).toBe('REMOVE isRegistered, isNew');
});

test('Building update expression with remotion', () => {
    const updateExpression = DynamoElementsBuilder.buildUpdateExpression({
        updateObject,
        deleteObject,
    });

    expect(updateExpression).toBe(
        'SET name = :name, lastName = :lastName, birthDate = :birthDate,REMOVE isRegistered, isNew'
    );
});

test('Building update expression attribute values', () => {
    const attributeValues =
        DynamoElementsBuilder.buildExpressionAttributesFromObject(updateObject);

    expect(attributeValues).toMatchObject({
        ':name': updateObject.name,
        ':lastName': updateObject.lastName,
        ':birthDate': updateObject.birthDate,
    });
});
