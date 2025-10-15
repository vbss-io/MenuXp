import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/@api/$1',
    '^@customers/(.*)$': '<rootDir>/src/@customers/$1',
    '^@restaurants/(.*)$': '<rootDir>/src/@restaurants/$1'
  }
}

export default config
