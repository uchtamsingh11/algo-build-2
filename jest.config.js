module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/test-setup.js',
    '!**/run-tests.js'
  ],
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
} 