module.exports = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  }
}
