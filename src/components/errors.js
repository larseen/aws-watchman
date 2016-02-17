

export class MissingRequiredValue extends Error {

    name = 'MissingRequiredValue';

    constructor(schemaValue, key) {
        const message = `MissingRequiredValue: Missing required value at key: ${key}.`;
        super(message);
        this.message = message;
        this.schema = schemaValue;
        this.key = key;
    }
}


export class NotValidType extends Error {

    name = 'NotValidType';

    constructor(configValue, schemaValue, key) {
        const message = `NotValidType:
        The value ${configValue} at key ${key} is not a type of ${schemaValue.type}.`;
        super(message);
        this.message = message;
        this.schema = schemaValue;
        this.key = key;
        this.value = configValue;
    }
}


export class NotValidProperty extends Error {

    name = 'NotValidProperty';

    constructor(configValue, schemaValue, key) {
        const message = `NotValidProperty: The value ${configValue} at key ${key} is not valid.`;
        super(message);
        this.message = message;
        this.schema = schemaValue;
        this.key = key;
        this.value = configValue;
    }
}

export class ValidationError extends Error {

    name = 'ValidationError';

    constructor(message) {
        super(message);
        this.message = message;
    }
}
