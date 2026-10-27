module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'], 
  testMatch: ['**/*.test.ts', '**/*.test.tsx']
};