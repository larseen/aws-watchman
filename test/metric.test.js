import Watchman from '../src/index';
import Config from './config';

describe('#Metrics', () => {
    const config = {
        Namespace: Config.Namespace,
        aws: {
            accessKeyId: Config.accessKeyId,
            secretAccessKey: Config.secretAccessKey
        }
    };
    const watchman = new Watchman(config);

    describe('Create a new metric', () => {
        const metric = {
            MetricName: 'Emails sent'
        };

        it('should create a valid metric', done => {
            const newMetric = watchman.newMetric(metric);
            newMetric.config.Namespace.should.equal(config.Namespace);
            newMetric.config.MetricName.should.equal(metric.MetricName);
            newMetric.config.Unit.should.equal('None');
            done();
        });

        it('should create a valid metric with a diffrent Namespace than Watchman', done => {
            metric.Namespace = 'different Namespace';
            const newMetric = watchman.newMetric(metric);
            newMetric.config.Namespace.should.not.equal(config.Namespace);
            newMetric.config.Namespace.should.equal(metric.Namespace);
            newMetric.config.MetricName.should.equal(metric.MetricName);
            newMetric.config.Unit.should.equal('None');
            done();
        });

        it('should throw a MissingRequiredValue Error', done => {
            delete metric.MetricName;
            const fn = function() { watchman.newMetric(metric); };
            fn.should.throw(/MissingRequiredValue/);
            done();
        });

        it('should throw a NotValidProperty Error', done => {
            metric.MetricName = 'Emails sent';
            metric.Unit = 'Not a vaild unit';
            const fn = function() { watchman.newMetric(metric); };
            fn.should.throw(/NotValidProperty/);
            done();
        });

        it('should throw a NotValidType Error', done => {
            metric.Unit = 'Count';
            metric.MetricName = 1234;
            const fn = function() { watchman.newMetric(metric); };
            fn.should.throw(/NotValidType/);
            done();
        });
        // TODO Test adding dimensions
    });
    describe('Put single metric data', () => {
        it('should add a count to the metric Count', done => {
            const metric = {
                MetricName: 'Count',
                Unit: 'Count'
            };

            const data = {
                Value: 1
            };
            const count = watchman.newMetric(metric);
            count.putMetric(data)
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });

        it('should be able to specify timestamp.', done => {
            const metric = {
                MetricName: 'Count',
                Unit: 'Count'
            };

            const today = new Date();

            const data = {
                Value: 1,
                Timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
            };
            const count = watchman.newMetric(metric);
            count.putMetric(data)
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });

        it('should add bytes to the metric DataProccessed', done => {
            const metric = {
                MetricName: 'DataProccessed',
                Unit: 'Bytes'
            };

            const data = {
                Value: 1
            };
            const count = watchman.newMetric(metric);
            count.putMetric(data)
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });

        it('should add StatisticValues to the metric DataProccessed', done => {
            const metric = {
                MetricName: 'DataProccessed',
                Unit: 'Bytes'
            };

            const data = {
                StatisticValues: {
                    Maximum: 42,
                    Minimum: 11,
                    Sum: 200,
                    SampleCount: 7
                }
            };
            const count = watchman.newMetric(metric);
            count.putMetric(data)
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });
    });
    describe('Put multiple metric data', () => {
        it('should add multiple count to the metric Count', done => {
            const metric = {
                MetricName: 'Count',
                Unit: 'Count'
            };

            const data = {
                Value: 1
            };
            const count = watchman.newMetric(metric);
            count.putMetrics([data,data,data,data,data])
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });
        it('should be able to specify timestamp.', done => {
            const metric = {
                MetricName: 'Count',
                Unit: 'Count'
            };

            const today = new Date();

            const data = {
                Value: 1,
                Timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
            };
            const count = watchman.newMetric(metric);
            count.putMetrics([data,data,data,data,data])
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });
        it('should add multiple StatisticValues to the metric DataProccessed', done => {
            const metric = {
                MetricName: 'DataProccessed',
                Unit: 'Bytes'
            };

            const data = {
                StatisticValues: {
                    Maximum: 42,
                    Minimum: 11,
                    Sum: 200,
                    SampleCount: 7
                }
            };
            const count = watchman.newMetric(metric);
            count.putMetrics([data,data,data,data,data])
                .then(response => {
                    response.should.have.property('ResponseMetadata');
                    done();
                });
        });
    });
});
