// The package is loaded by the test runner; suppress the diagnostic when its
// type declarations are not available to the TypeScript project.
// @ts-expect-error TS2882: optional test-only dependency declarations
import '@testing-library/jest-dom';
