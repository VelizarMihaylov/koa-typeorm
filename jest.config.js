module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/dotenv/config.js']
}
