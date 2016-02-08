import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Watchman from '../src/index';
import * as Errors from '../src/components/errors'
chai.use(chaiAsPromised);
const should = chai.should();

describe('#Watchman', () => {

    describe('Init Watchman', () => {

        it('should create a valid Watchman', done => {

            const config = {
                nameSpace: 'aws-watchman',
                aws: {
                    accessKeyId: '214rihjonfofn',
                    secretAccessKey: '3i2hjro3ofn2oin2'
                }
            };

            // Should add some checks here?
            const watchman = new Watchman(config);
            watchman.config.nameSpace.should.equal(config.nameSpace);
            watchman.config.aws.accessKeyId.should.equal(config.aws.accessKeyId);
            watchman.config.aws.secretAccessKey.should.equal(config.aws.secretAccessKey);
            watchman.config.aws.region.should.equal('eu-west-1');
            done();

        });

        it('should throw a MissingRequiredValue Error', done => {

            const config = {
                nameSpace: 'aws-watchman',
                aws: {
                    accessKeyId: '214rihjonfofn',
                }
            };

            const fn = function() {  const watchman = new Watchman(config); }
            fn.should.throw(/MissingRequiredValue/);
            done()


        });

        it('should throw a NotValidType Error', done => {

            const config = {
                nameSpace: 'aws-watchman',
                aws: {
                    accessKeyId: '214rihjonfofn',
                    secretAccessKey: 123124124312341
                }
            };

            const fn = function() {  const watchman = new Watchman(config); }
            fn.should.throw(/NotValidType/);
            done()


        });

        it('should throw a NotValidProperty Error', done => {

            const config = {
                nameSpace: 'aws-watchman',
                aws: {
                    region: 'northpole',
                    accessKeyId: '214rihjonfofn',
                    secretAccessKey: '123124124312341'
                }
            };

            const fn = function() {  const watchman = new Watchman(config); }
            fn.should.throw(/NotValidProperty/);
            done()

        });

    });
});
