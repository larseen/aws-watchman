import { AllowedMetricUnits, AllowedRegions } from './constants';

module.exports.watchmanSchema = {
    nameSpace: {
        default: 'Watchman',
        required: true,
        type: "string"
    },
    aws: {
        region:{
            default: 'eu-west-1',
            required: true,
            type: "string",
            validate : function(region){
                return AllowedRegions.indexOf(region) > -1;
            }
        },
        accessKeyId: {
            required: true,
            type: "string"
        },
        secretAccessKey: {
            required: true,
            type: "string"
        }
    }

}

export function metricSchema(Watchman) {
    return {
        Namespace: {        // String, The container or category for the metric
            required: true,
            default: Watchman.namespace,
            type: String
        },
        MetricName: {       // String, The metric name
            required: true,
            type: String
        },
        Dimensions: {       // Array, A list of dimensions associated with the metric
            type: Array,
            required: false,
            Schema: {
                Name: {     // String, The name of the dimension.
                    required: true,
                    type: String
                },
                Value: {    // String, The value representing the dimension measurement
                    required: true,
                    type: String
                }
            }
        },
        Unit: {             // String, The unit of the metric.
            type: String,
            required: false,
            default: 'None',
            validate : function(unit){
                return AllowedMetricUnits.indexOf(unit) > -1;
            }
        },
        StatisticValues: {  // Object, A set of statistical values describing the metric.
            Maximum: {      // Float, The maximum value of the sample set.
                type: Number,
                required: true,
                default: 0.0
            },
            Minimum: {      // Float, The minimum value of the sample set.
                type: Number,
                required: true,
                default: 0.0
            },
            SampleCount: {  // Float, The number of samples used for the statistic set.
                type: Number,
                required: true,
                default: 0.0
            },
            Sum: {           // Float, The sum of values for the sample set.
                type: Number,
                required: true,
                default: 0.0
            }
        }
    }
};
