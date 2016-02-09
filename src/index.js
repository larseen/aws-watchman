import AWS from 'aws-sdk';
import Bluebird from 'bluebird';
import { validate } from './components/functions';
import { watchmanSchema } from './components/schemas';
import Metric from './metric';
Bluebird.promisifyAll(AWS);

class Watchman {

    constructor(config){

        this.config = validate(config, watchmanSchema)
        this.CloudWatch = new AWS.CloudWatch(this.config.aws)
        this.metrics = {}

    }

    newMetric(metric){
        const _metric = new Metric(this.CloudWatch,this.config, metric)
        this.metrics[_metric.MetricName] = _metric;
        return _metric
    }

    putMetric(name){

    }


}

export default Watchman
