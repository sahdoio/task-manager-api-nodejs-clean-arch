module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'main',
    'entities',
    'database',
    'env',
    'server.ts',
    'errors/index.ts'
  ],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}
