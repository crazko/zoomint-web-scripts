// TODO:
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('./src/configs/jest.config');

module.exports = { ...config, testMatch: ['**/?(*.)+(spec).[t]s?(x)'] };
