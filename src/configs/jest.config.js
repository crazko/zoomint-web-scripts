// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  rootDir: path.join(process.cwd(), 'src'),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Code Coverage
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
