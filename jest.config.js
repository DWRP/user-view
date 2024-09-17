module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/utils/test-utils.tsx'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@themes/(.*)$': '<rootDir>/src/themes/$1',
    '^@test/(.*)$': '<rootDir>/__tests__/$1',
    '^@i18n$': '<rootDir>/src/i18n',
    '^@$': '<rootDir>/src/',
  },

  transform: {
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
  },

  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
