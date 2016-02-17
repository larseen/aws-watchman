import { ValidationError } from './errors';
import { AllowedMetricUnits, AllowedRegions } from './constants';

module.exports.watchmanSchema = {
    Namespace: {
        default: 'Watchman',
        required: true,
        type: 'string'
    },
    aws: {
        region: {
            default: 'eu-west-1',
            required: true,
            type: 'string',
            validate(region) {
                return AllowedRegions.indexOf(region) > -1;
            }
        },
        accessKeyId: {
            required: true,
            type: 'string'
        },
        secretAccessKey: {
            required: true,
            type: 'string'
        }
    }

};

export function metricSchema(config) {
    return {
        Namespace: {        // String, The container or category for the metric
            required: true,
            default: config.Namespace,
            type: 'string'
        },
        MetricName: {       // String, The metric name
            required: true,
            type: 'string'
        },
        Dimensions: {      // Array, A list of dimensions associated with the metric
            type: 'object',
            required: false,
            default: [],
            Schema: {
                Name: {     // String, The name of the dimension.
                    required: false,
                    type: 'string'
                },
                Value: {    // String, The value representing the dimension measurement
                    required: false,
                    type: 'string'
                }
            }
        },
        Unit: {             // String, The unit of the metric.
            type: 'string',
            required: false,
            default: 'None',
            validate(unit) {
                return AllowedMetricUnits.indexOf(unit) > -1;
            }
        }
    };
}
/**
 * Need to take accoutn for value either beeing a object of a value,
 * Single value
 * Single value + Timestamp
 * StatisticValues
 * StatisticValues + Timestamp
 */
export function metricDataSchema(metric, metricData) {
    let requireValue = false;
    let requireStatisticValues = false;

    if ('Value' in metricData) requireValue = true;
    if ('StatisticValues' in metricData) requireStatisticValues = true;
    if (!requireValue && !requireStatisticValues) {
        throw new ValidationError('Specify either Value or StatisticValues in MetricData');
    }
    if (requireValue && requireStatisticValues) {
        throw new ValidationError('Cannot use StatisticValues and MetricData, select one to use');
    }

    const _metricDataSchema = {
        MetricName: {       // String, The metric name
            required: true,
            default: metric.MetricName,
            type: 'string'
        },
        Dimensions: {      // Array, A list of dimensions associated with the metric
            type: 'object',
            required: false,
            default: metric.Dimensions,
            Schema: {
                Name: {     // String, The name of the dimension.
                    required: false,
                    type: 'string'
                },
                Value: {    // String, The value representing the dimension measurement
                    required: false,
                    type: 'string'
                }
            }
        },
        Unit: {             // String, The unit of the metric.
            type: 'string',
            required: true,
            default: metric.Unit,
            validate(unit) {
                return AllowedMetricUnits.indexOf(unit) > -1;
            }
        },
        Timestamp: {
            required: true,
            default: new Date(),
            type: 'object'
        }
    };

    if (requireValue) {
        _metricDataSchema.Value = {
            required: true,
            type: 'number',
            default: metricData.Value
        };
    }
    if (requireStatisticValues) {
        _metricDataSchema.StatisticValues = {
            Maximum: {
                required: true,
                type: 'number',
                default: metricData.StatisticValues.Maximum
            },
            Minimum: {
                required: true,
                type: 'number',
                default: metricData.StatisticValues.Minimum
            },
            SampleCount: {
                required: true,
                type: 'number',
                default: metricData.StatisticValues.SampleCount
            },
            Sum: {
                required: true,
                type: 'number',
                default: metricData.StatisticValues.Sum
            }
        };
    }
    return _metricDataSchema;
}
