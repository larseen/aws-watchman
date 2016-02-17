import Promise from 'bluebird';
import { metricSchema, metricDataSchema } from './components/schemas';
import { validate } from './components/functions';

class Metric {
    constructor(CloudWatch, config, metric) {
        this.CloudWatch = CloudWatch;
        this.config = validate(metric, metricSchema(config));
        return this;
    }

    _validateMetricData(metricData) {
        return validate(metricData, metricDataSchema(this.config, metricData));
    }

    putMetric(metricData) {
        const _metricData = this._validateMetricData(metricData);
        const params = {
            MetricData: [_metricData],
            Namespace: this.config.Namespace
        };
        return this.CloudWatch.putMetricDataAsync(params)
            .catch(err => { // need to catch and thorw transform errors
                console.log(err);
            });
    }

    putMetrics(metricsData) {
        return Promise.map(metricsData, _metricData => this._validateMetricData(_metricData))
        .then(_metricData => {
            const params = {
                MetricData: _metricData,
                Namespace: this.config.Namespace
            };
            return this.CloudWatch.putMetricDataAsync(params)
                .catch(err => { // need to catch and thorw transform errors
                    console.log(err);
                });
        });
    }


}

export default Metric;
