import _ from 'lodash';
import Bluebird from 'bluebird';
import * as Schemas from './schemas';
import * as Errors from './errors';

let _config

function _validateField(configValue, schemaValue, key){

    let _key = key;
    let _value = configValue;
    let _required = schemaValue.required;
    let _default = schemaValue.default;
    let _type = schemaValue.type;
    let _validate = schemaValue.validate;


    if(_value === undefined || _value === null){

        if(_required && _default){
            return _default;
        }

        if(_required && !_default){
            throw new Errors.MissingRequiredValue(schemaValue, _key)
        }

        if(!_required){
            return _default || null;
        }

    }else{

        if(!(typeof _value === _type)){
            throw new Errors.NotValidType(_value, schemaValue, _key)
        }

        if(_validate && !_validate(_value)){
            throw new Errors.NotValidProperty(_value, schemaValue, _key)
        }

        return _value;

    }

}

function _validateProperty(configValue, schemaValue, key){

    if('required' in schemaValue) return _validateField(configValue, schemaValue, key)
    else{

        let _configObject = {};

        _.forEach(schemaValue, function(_schemaValue, _schemaKey) {
            const _configValue = configValue[_schemaKey]
            _configObject[_schemaKey] = _validateProperty(_configValue, _schemaValue, _schemaKey)
        });



        return _configObject
    }
}

export function validate(config, schema){

    _config = {};

    _.forEach(schema, function(_schemaValue, _schemaKey) {
        const _configValue = config[_schemaKey]
        _config[_schemaKey] = _validateProperty(_configValue, _schemaValue, _schemaKey);
    });

    return _config;

}
