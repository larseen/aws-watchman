const config = {
    env: process.env.NODE_ENV || 'test',
    Namespace: process.env.Namespace || 'aws-watchman',
    accessKeyId: process.env.accessKeyId || null,
    secretAccessKey: process.env.secretAccessKey || null
};

export default config;
