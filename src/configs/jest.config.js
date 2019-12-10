const path = require('path');

module.exports = {
  rootDir: path.join(process.cwd(), 'src'),
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // TODO: 👇
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // snapshotSerializers: ['./node_modules/enzyme-to-json'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
