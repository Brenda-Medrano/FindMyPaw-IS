module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'],
  setupFiles: ['<rootDir>/jest.polyfills.cjs'], 
  testMatch: ['**/*.test.ts', '**/*.test.tsx']
  
};