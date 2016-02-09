import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Watchman from '../src/index';
import * as Errors from '../src/components/errors'
chai.use(chaiAsPromised);
const should = chai.should();

describe('#Metrics', () => {

    const config = {
        NameSpace: 'aws-watchman',
        aws: {
            accessKeyId: '214rihjonfofn',
            secretAccessKey: '3i2hjro3ofn2oin2'
        }
    };

    const watchman = new Watchman(config);

    let metric = {
        MetricName: "Emails sent",
        StatisticValues: {
            Maximum: 10,
            Minimum: 0,
            SampleCount: 5,
            Sum: 5
        }

    }

    describe('Create a new metric', () => {

        it('should create a valid metric', done => {

            const newMetric = watchman.newMetric(metric);
            newMetric.config.NameSpace.should.equal(config.NameSpace);
            newMetric.config.MetricName.should.equal(metric.MetricName);
            newMetric.config.StatisticValues.should.eql(metric.StatisticValues);
            newMetric.config.Unit.should.equal('None');
            newMetric.putMetric.should.be.an.Object
            done();

        });

        it('should create a valid metric with a diffrent NameSpace than Watchman', done => {

            metric.NameSpace = 'diffrent NameSpace';
            const newMetric = watchman.newMetric(metric);
            newMetric.config.NameSpace.should.not.equal(config.NameSpace);
            newMetric.config.NameSpace.should.equal(metric.NameSpace);
            newMetric.config.MetricName.should.equal(metric.MetricName);
            newMetric.config.StatisticValues.should.eql(metric.StatisticValues);
            newMetric.config.Unit.should.equal('None');
            newMetric.putMetric.should.be.an.Object
            done();

        });

        it('should throw a MissingRequiredValue Error', done => {

            delete metric.MetricName;
            const fn = function() { const newMetric = watchman.newMetric(metric); }
            fn.should.throw(/MissingRequiredValue/);
            done()

        });

        it('should throw a NotValidProperty Error', done => {

            metric.MetricName = "Emails sent";
            metric.Unit = 'Not a vaild unit';
            const fn = function() { const newMetric = watchman.newMetric(metric); }
            fn.should.throw(/NotValidProperty/);
            done()

        });

        it('should throw a NotValidType Error', done => {

            metric.Unit = 'Count';
            metric.StatisticValues.Maximum = '99';
            const fn = function() { const newMetric = watchman.newMetric(metric); }
            fn.should.throw(/NotValidType/);
            done()

        });

        // TODO Test adding dimensions

    });

    describe('Put metric data', () => {

    });


});
