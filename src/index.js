import AWS from 'aws-sdk';
import Bluebird from 'bluebird';
import { validate } from './components/functions';
import { watchmanSchema } from './components/schemas';
import Metrics from './metrics';

class Watchman {

    constructor(config){

        this.config = validate(config, watchmanSchema)
        this.CloudWatch = new AWS.CloudWatch(this.config.aws)
        this.Metrics = new Metrics(this.CloudWatch, this.config);

    }

    newMetric(name){

    }

    putMetric(name){

    }


}

export default Watchman
