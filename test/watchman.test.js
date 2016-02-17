import Config from './config';
import Watchman from '../src/index';

describe('#Watchman', () => {
    describe('Init Watchman', () => {
        it('should create a valid Watchman', done => {
            const config = {
                Namespace: Config.Namespace,
                aws: {
                    accessKeyId: Config.accessKeyId,
                    secretAccessKey: Config.secretAccessKey
                }
            };

            // Should add some checks here?
            const watchman = new Watchman(config);
            watchman.config.Namespace.should.equal(config.Namespace);
            watchman.config.aws.accessKeyId.should.equal(config.aws.accessKeyId);
            watchman.config.aws.secretAccessKey.should.equal(config.aws.secretAccessKey);
            watchman.config.aws.region.should.equal('eu-west-1');
            done();
        });

        it('should throw a MissingRequiredValue Error', done => {
            const config = {
                Namespace: Config.Namespace,
                aws: {
                    accessKeyId: Config.accessKeyId
                }
            };

            const fn = function() { new Watchman(config); };
            fn.should.throw(/MissingRequiredValue/);
            done();
        });

        it('should throw a NotValidType Error', done => {
            const config = {
                Namespace: Config.Namespace,
                aws: {
                    accessKeyId: 123456789,
                    secretAccessKey: Config.secretAccessKey
                }
            };

            const fn = function() { new Watchman(config); };
            fn.should.throw(/NotValidType/);
            done();
        });

        it('should throw a NotValidProperty Error', done => {
            const config = {
                Namespace: Config.Namespace,
                aws: {
                    region: 'northpole',
                    accessKeyId: Config.accessKeyId,
                    secretAccessKey: Config.secretAccessKey
                }
            };

            const fn = function() { new Watchman(config); };
            fn.should.throw(/NotValidProperty/);
            done();
        });
    });
});
