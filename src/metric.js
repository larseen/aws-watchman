import _ from 'lodash';
import { metricSchema } from './components/schemas'
import { validate } from './components/functions';

class Metric {


    constructor(CloudWatch, config, metric){

        this.CloudWatch = CloudWatch;
        const _metric = validate(metric, metricSchema(config))
        this.config = _metric;
        return this;

    }

    putMetric(data){
        const _data = createMetricData(data);
        return this.CloudWatch.putMetricDataAsync(_data)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }



}

export default Metric
